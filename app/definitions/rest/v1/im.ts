import type { IMessageFromServer } from '../../IMessage';
import type { IServerRoom, RoomID, RoomType } from '../../IRoom';
import type { IUser } from '../../IUser';
import { IServerAttachment } from '../../IAttachment';

export type ImEndpoints = {
	'im.create': {
		POST: (
			params: (
				| {
						username: Exclude<IUser['username'], undefined>;
				  }
				| {
						usernames: string;
				  }
			) & {
				excludeSelf?: boolean;
			}
		) => {
			room: {
				t: RoomType;
				rid: RoomID;
				_id: RoomID;
				usernames: IServerRoom['usernames'];
			};
		};
	};
	'im.files': {
		GET: (params: { roomId: IServerRoom['_id']; offset: number; sort: string | { uploadedAt: number } }) => {
			files: IServerAttachment[];
			count: number;
			offset: number;
			total: number;
		};
	};
	'im.members': {
		GET: (params: { roomId: IServerRoom['_id']; offset?: number; count?: number; filter?: string; status?: string[] }) => {
			count: number;
			offset: number;
			members: IUser[];
			total: number;
		};
	};
	'im.history': {
		GET: (params: { roomId: string; count: number; latest?: string }) => {
			messages: IMessageFromServer[];
		};
	};
	'im.close': {
		POST: (params: { roomId: string }) => {};
	};
	'im.kick': {
		POST: (params: { roomId: string; userId: string }) => {};
	};
	'im.delete': {
		POST: (params: { roomId: string }) => {};
	};
	'im.leave': {
		POST: (params: { roomId: string }) => {};
	};
	'im.messages': {
		GET: (params: {
			roomId: IServerRoom['_id'];
			query: { 'mentions._id': { $in: string[] } } | { 'starred._id': { $in: string[] } } | { pinned: boolean };
			offset: number;
			sort: { ts: number };
		}) => {
			messages: IMessageFromServer[];
		};
	};
};
