import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UpgradeModalService {
  private _visible = signal(false);
  readonly visible = this._visible.asReadonly();

  open():  void { this._visible.set(true);  }
  close(): void { this._visible.set(false); }
}
