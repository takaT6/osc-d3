import WebSocketWorker from 'worker-loader?inline=fallback!@/work/websocket-worker.ts';
import { ref } from 'vue';
import { RenderUtil } from "@/script/renderUtil";

export class WebSocketUtil extends RenderUtil{

  public wsWorker = new WebSocketWorker();
  
  public isConnect = ref(false);

  public isProcess = ref(false);
  
  public wsPostMessage = (mssg:string | object): void => { 
    if (typeof mssg === 'string') this.wsWorker.postMessage({mssg}); 
    else this.wsWorker.postMessage(mssg); 
  }

  public newFrame = (): void => {
    if (this.isProcess.value) {
      this.wsPostMessage('sendData');
      requestAnimationFrame(this.newFrame);
    }
  }

  public connect = (): void => this.wsPostMessage('connect');

  public disconnect = (): void => this.wsPostMessage('disconnect');

  public run(): void{ 
    if (this.isTimer) this.wsPostMessage({mssg:'run', timer:this.timer});
    else this.wsPostMessage('run');
  }

  public stop = (): void => this.wsPostMessage('stop');
}