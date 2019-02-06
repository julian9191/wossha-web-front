"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultFileUploadAdapter = /** @class */ (function () {
    /**
     * @summary Basic file upload adapter implementation for HTTP request form file consumption
     * @param _serverEndpointUrl The API endpoint full qualified address that will receive a form file to process and return the metadata.
     */
    function DefaultFileUploadAdapter(_serverEndpointUrl, _http) {
        this._serverEndpointUrl = _serverEndpointUrl;
        this._http = _http;
    }
    DefaultFileUploadAdapter.prototype.uploadFile = function (file, userTo) {
        var formData = new FormData();
        //formData.append('ng-chat-sender-userid', currentUserId);
        formData.append('ng-chat-destinatary-userid', userTo.id);
        formData.append('file', file, file.name);
        return this._http.post(this._serverEndpointUrl, formData);
        // TODO: Leaving this if we want to track upload progress in detail in the future. Might need a different Subject generic type wrapper
        // const fileRequest = new HttpRequest('POST', this._serverEndpointUrl, formData, {
        //     reportProgress: true
        // });
        // const uploadProgress = new Subject<number>();
        // const uploadStatus = uploadProgress.asObservable();
        //const responsePromise = new Subject<Message>();
        // this._http
        //     .request(fileRequest)
        //     .subscribe(event => {
        //         // if (event.type == HttpEventType.UploadProgress)
        //         // {
        //         //     const percentDone = Math.round(100 * event.loaded / event.total);
        //         //     uploadProgress.next(percentDone);
        //         // }
        //         // else if (event instanceof HttpResponse)
        //         // {
        //         //     uploadProgress.complete();
        //         // }
        //     });
    };
    return DefaultFileUploadAdapter;
}());
exports.DefaultFileUploadAdapter = DefaultFileUploadAdapter;
//# sourceMappingURL=default-file-upload-adapter.js.map