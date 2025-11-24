// docs.gateway.ts
import { DocumentDTO } from '@gdocs/shared/document.dto.js';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { DocsService } from './docs.service';

@WebSocketGateway({
	cors: { origin: '*' }, // allow frontend to connect TODO: need to change during deployment
})
export class DocsGateway implements OnGatewayConnection {
	@WebSocketServer()
	server: Server;

	constructor(private readonly docsService: DocsService) {}

	private verifyToken(token: string) {
		return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
	}

	handleConnection(client: Socket) {
		const token = client.handshake.query.token as string;

		try {
			const payload: any = this.verifyToken(token);
			client.data.userId = payload.sub;
		} catch {
			client.disconnect();
		}
	}

	@SubscribeMessage('joinDoc')
	async handleJoin(
		@MessageBody() data: { docId: string },
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId;

		// 1. Validate access
		const doc = await this.docsService.findByIdForUser(
			data.docId,
			userId,
		);
		if (!doc) {
			return { error: 'Forbidden' };
		}

		// 2. Join room
		client.join(data.docId);

		return { success: true };
	}

	@SubscribeMessage('updateDoc')
	async handleUpdateDoc(
		@MessageBody() data: { docId: string; content: string },
		@ConnectedSocket() client: Socket,
	) {
		const userId = client.data.userId;

		const updated = await this.docsService.update(
			data.docId,
			{ content: data.content },
			userId,
		);

		this.server.to(data.docId).emit('docUpdated', updated);
		return updated;
	}

	@SubscribeMessage('getDoc')
	async getFullDoc(
		@MessageBody() docID: string,
	): Promise<DocumentDTO | null> {
		return this.docsService.getOne(docID, 'TEMP_USER_ID');
	}
}
