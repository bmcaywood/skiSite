import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class Mediator {
  private socket;
  private url = 'http://localhost:8000';
  private objects: Map<string, any> = new Map<string, any>();

  constructor() {
    this.socket = io(this.url);
  }

  /**
   * Subscribe to an event
   * @param key string
   * @param callback callback function any
   */
  public subscribe(key: string, callback: any) {
    if (this.objects.has(key)) {
      return callback(this.objects.get(key));
    } else {
      this.socket.on(key, (obj) => {
        console.log('here with obj: ' + JSON.stringify(obj));
        this.objects.set(key, obj);
        return callback(obj);
      });
    }
  }

  /**
   * publish a value to the server
   * @param key string
   * @param item any
   */
  public publish(key: string, item: any) {
    this.socket.emit(key, item);
  }

  /**
   * request server item
   * @param key string
   * @param param optional number (id)
   */
  public request(key: string, param?: number) {
    if (param) {
      this.socket.emit(key, param);
    } else {
      this.socket.emit(key);
    }
  }

  /**
   * unsubscribe from an event, and remove item from memory.
   * @param key string
   * @param callback callback function any
   */
  public unsubscribe(key: string, callback: any) {
    this.socket.removeListener(key, callback);
    this.objects.delete(key);
  }
}
