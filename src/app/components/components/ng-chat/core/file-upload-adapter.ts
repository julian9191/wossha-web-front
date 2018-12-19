import { Observable } from 'rxjs';
import { ChatUser } from './chatUser';
import { Message } from './message';

export interface IFileUploadAdapter
{
    uploadFile(file: File, userTo: ChatUser): Observable<Message>;
}
