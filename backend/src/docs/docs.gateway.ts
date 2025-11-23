import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	MessageBody,
	ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DocsService } from './docs.service';
import { DocumentDTO } from '@gdocs/shared/document.dto.js';

@WebSocketGateway({
	cors: { origin: '*' }, // allow frontend to connect TODO: need to change during deployment
})
export class DocsGateway {
	@WebSocketServer()
	server: Server;

	constructor(private readonly docsService: DocsService) {}

	@SubscribeMessage('joinDoc')
	handleJoinDoc(@MessageBody() docId: string, @ConnectedSocket() client: Socket) {
		client.join(docId);
		console.log(`Client joined doc ${docId}`);
	}

	@SubscribeMessage('updateDoc')
	async handleUpdateDoc(@MessageBody() data: { docId: string; content: string }) {
		const updated = await this.docsService.update(
			data.docId,
			{ content: data.content },
			'TEMP_USER_ID',
		);

		// Broadcast update to all clients in the same document
		this.server.to(data.docId).emit('docUpdated', updated);
		return updated;
	}

	@SubscribeMessage('getDoc')
	async getFullDoc(@MessageBody() docID: string): Promise<DocumentDTO | null> {
		return this.docsService.getOne(docID, 'TEMP_USER_ID');
	}
}
