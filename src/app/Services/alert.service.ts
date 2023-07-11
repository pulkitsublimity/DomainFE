import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert(msg:string, duration:number , status:string){
    let alertElement = document.createElement("div");
    alertElement.className = "alert alert-" + status + " text-center";
    alertElement.setAttribute("style","position: absolute;top: 60px;width:60vw;left:0;right:0;margin:auto;z-index:100;")
    alertElement.innerHTML = '<span class="mx-auto">' + msg + '</span>';

  // Append the alert to the body
  document.body.appendChild(alertElement);

  // Automatically remove the alert after the specified duration
  setTimeout(function() {
    alertElement.remove();
  }, duration);
  }
}
