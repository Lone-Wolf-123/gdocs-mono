// useAppData.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppDataStore = create(
	persist(
		(set) => ({
			theme: 'dark',
			userPreference: 'compact',
			setTheme: (theme: string) => set({ theme }),
			setUserPreference: (pref: string) =>
				set({ userPreference: pref }),
		}),
		{
			name: 'app-data-storage', // unique name for localStorage key
		},
	),
);
