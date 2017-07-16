import { Injectable }     from '@angular/core';

@Injectable()
export class StabelSamples {
  public get buildStatus() : string{
    return `
<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="88" height="20">
    <style>
        #statusLbl{
            fill: #9f9f9f;
        }
        .passing > #statusLbl{
            fill: #4c1;
        }
        .failure > #statusLbl{
            fill: #e05d44;
        }
    </style>
    <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="a">
        <rect width="88" height="20" rx="3" fill="#fff"/>
    </clipPath>
    <g class="{{passing or failure}}" clip-path="url(#a)">
        <path fill="#555" d="M0 0h37v20H0z"/>
        <path id="statusLbl" fill="#4c1" d="M37 0h51v20H37z"/>
        <path fill="url(#b)" d="M0 0h88v20H0z"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="18.5" y="15" fill="#010101" fill-opacity=".3">build</text>
        <text x="18.5" y="14">build</text>
        <text x="61.5" y="15" fill="#010101" fill-opacity=".3">{{passing or failure}}</text>
        <text x="61.5" y="14">{{passing or failure}}</text>
    </g>
</svg>`;
  }

  get location() : string{
    return `
<svg width="128" height="32"
    xmlns="http://www.w3.org/2000/svg">
    <style>
        .yes > rect,
        .yes > ellipse,
        .yes > path{
            fill: #8BC34A
        }
        
    </style>
    <defs>
        <linearGradient y2="0" x2="0.5" y1="1" x1="0.5" id="gradient">
            <stop offset="0" stop-color="#4c4c4c"/>
            <stop offset="1" stop-color="#b3b3b3"/>
        </linearGradient>
    </defs>
    <g class="{{yes or no}}">
        <rect height="32" width="128" y="0" x="0" stroke-width="1.5" fill="url(#gradient)" rx="5"/>
        <ellipse fill="#4c4c4c" stroke-width="1.5" cx="18.78846" cy="16" rx="13.15385" ry="13.15385" stroke="#ffffff"/>
        <path d="m18.78846,9.07692c-2.67231,0 -4.84616,2.17385 -4.84616,4.84616c0,3.63462 4.84616,9 4.84616,9s4.84616,-5.36539 4.84616,-9c0,-2.67231 -2.17385,-4.84616 -4.84616,-4.84616zm2.76923,5.53846l-2.07692,0l0,2.07692l-1.38462,0l0,-2.07692l-2.07692,0l0,-1.38462l2.07692,0l0,-2.07692l1.38462,0l0,2.07692l2.07692,0l0,1.38462z" id="svg_3" fill="#4c4c4c" stroke="#ffffff"/>
        <text fill="#ffffff" stroke="#000" stroke-width="0" stroke-opacity="null" fill-opacity="null" x="40.82692" y="22.54567" id="svg_6" font-size="19" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">{{location}}</text>
    </g>
</svg>`;
  }

  get visitors() : string{
    return `
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
   <g>
      <rect fill="#01cc44" stroke-width="null" x="0" y="0" width="128" height="128" id="svg_4" rx="16"/>
      <rect fill="#4c4c4c" stroke-width="null" x="0" y="42.666" width="128" height="42.6666" id="svg_5"/>
      <text style="cursor: move;" stroke="#000" transform="matrix(1.0554970502853394,0,0,1,0,0) " fill="#ffffff" stroke-width="0" stroke-opacity="null" x="64" y="71.28124" id="svg_1" font-size="24" font-family="Helvetica, Arial, sans-serif" text-anchor="middle" xml:space="preserve">{{count}}</text>
      <path d="m74.01838,18.02756c4.15763,0 7.48874,-3.35615 7.48874,-7.51378s-3.33111,-7.51378 -7.48874,-7.51378c-4.15763,0 -7.51378,3.35615 -7.51378,7.51378s3.35615,7.51378 7.51378,7.51378zm-20.03675,0c4.15763,0 7.48874,-3.35615 7.48874,-7.51378s-3.33111,-7.51378 -7.48874,-7.51378c-4.15763,0 -7.51378,3.35615 -7.51378,7.51378s3.35615,7.51378 7.51378,7.51378zm0,5.00919c-5.8357,0 -17.53215,2.93037 -17.53215,8.76608l0,6.26148l35.0643,0l0,-6.26148c0,-5.8357 -11.69645,-8.76608 -17.53215,-8.76608zm20.03675,0c-0.72633,0 -1.55285,0.05009 -2.42945,0.12523c2.90533,2.10386 4.93405,4.93405 4.93405,8.64085l0,6.26148l15.02756,0l0,-6.26148c0,-5.8357 -11.69645,-8.76608 -17.53215,-8.76608l-0.00001,0z" id="svg_2" stroke="null" fill="#4c4c4c"/>
      <text fill="#4c4c4c" stroke="null" stroke-width="0" stroke-opacity="null" x="26.68579" y="115.85662" id="svg_3" font-size="24" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">visitors</text>
   </g>
</svg>`;
  }

  get serviceStatus() : string{
    return `
<?xml version="1.0" encoding="UTF-8"?>
<svg
    xmlns="http://www.w3.org/2000/svg" width="80" height="32">
    <style>
      #pause, #play{
        display:none;
      }
      rect{
        fill: silver;
      }
      .stopped > rect{
        fill:#f44336;
      }
      .running > rect{
        fill:#5fbf00
      }
      .stopped > #pause{
        display:block;
      }
      .running > #play{
        display:block;
      }
    </style>
    <g class="{{stopped or running}}">
        <rect rx="6" stroke="null" stroke-width="null" stroke-opacity="null" x="0" y="0" width="80" height="32" id="svg_1" />
        <path id="pause" fill="#ffffff" d="m65.26087,20l2,0l0,-8l-2,0l0,8zm3,-14c-5.52,0 -10,4.48 -10,10s4.48,10 10,10s10,-4.48 10,-10s-4.48,-10 -10,-10zm0,18c-4.41,0 -8,-3.59 -8,-8s3.59,-8 8,-8s8,3.59 8,8s-3.59,8 -8,8zm1,-4l2,0l0,-8l-2,0l0,8z" />
        <path id="play" fill="#ffffff" d="m64.56251,20.5l6,-4.5l-6,-4.5l0,9zm2,-14.5c-5.52,0 -10,4.48 -10,10s4.48,10 10,10s10,-4.48 10,-10s-4.48,-10 -10,-10zm0,18c-4.41,0 -8,-3.59 -8,-8s3.59,-8 8,-8s8,3.59 8,8s-3.59,8 -8,8z" />
        <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_4" y="26.93342" x="4.57542" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#ffffff">{{stopped or running}}</text>
        <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_5" y="12.84783" x="4.67393" stroke-opacity="null" stroke-width="0" stroke="null" fill="#ffffff">{{service name}}</text>
    </g>
</svg>`;
  }

}
