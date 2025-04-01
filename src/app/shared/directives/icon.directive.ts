import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[icon]',
  standalone: true,
})
export class IconDirective implements OnInit, OnChanges {
  @Input('icon') public name!: keyof IconDirective['icon'];

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  private notIcon = `<svg class="svg-inline--fa not-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="not-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><g class="missing"><path fill="currentColor" d="M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"></path><circle fill="currentColor" cx="256" cy="364" r="28"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="r" values="28;14;28;28;14;28;"></animate><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="1;0;1;1;0;1;"></animate></circle><path fill="currentColor" opacity="1" d="M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="1;0;0;0;0;1;"></animate></path><path fill="currentColor" opacity="0" d="M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="0;0;1;1;0;0;"></animate></path></g></svg>`;

  private icon = {
    loading: `<svg class="svg-inline--fa fa-spinner-third fa-spin" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner-third" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32V0zM422.3 352c-8.9 15.3-3.6 34.9 11.7 43.7s34.9 3.6 43.7-11.7L422.3 352zM256 64c106 0 192 86 192 192h64C512 114.6 397.4 0 256 0V64zM448 256c0 35-9.4 67.8-25.7 96L477.7 384c21.8-37.7 34.3-81.5 34.3-128H448z"></path></svg>`,
    arrow_right: `<svg class="svg-inline--fa fa-arrow-right" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M443.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-176-176c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L393.4 240 16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l377.4 0L244.7 420.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l176-176z"></path></svg>`,
    display_code: `<svg class="svg-inline--fa fa-display-code" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="display-code" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M512 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H344.3c-.2 0-.4 0-.6 0H232.3c-.2 0-.4 0-.6 0H64c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32H512zM64 416H213.1l-10.7 64H144c-8.8 0-16 7.2-16 16s7.2 16 16 16h72H360h72c8.8 0 16-7.2 16-16s-7.2-16-16-16H373.6l-10.7-64H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64zm170.9 64l10.7-64h84.9l10.7 64H234.9zm16.4-324.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-64 64c-6.2 6.2-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L198.6 208l52.7-52.7zm96-22.6c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L377.4 208l-52.7 52.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c6.2-6.2 6.2-16.4 0-22.6l-64-64z"></path></svg>`,
    server: `<svg class="svg-inline--fa fa-server" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="server" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 64C46.3 64 32 78.3 32 96v64c0 17.7 14.3 32 32 32H448c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H64zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 320c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H448c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H64zM0 352c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V352zm304 32a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm24-280a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 280a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm24-280a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path></svg>`,
    robot: `<svg class="svg-inline--fa fa-robot" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="robot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M320 0c8.8 0 16 7.2 16 16V96H448c53 0 96 43 96 96V416c0 53-43 96-96 96H192c-53 0-96-43-96-96V192c0-53 43-96 96-96H304V16c0-8.8 7.2-16 16-16zM192 128c-35.3 0-64 28.7-64 64V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H320 192zm16 256h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H208c-8.8 0-16-7.2-16-16s7.2-16 16-16zm96 0h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H304c-8.8 0-16-7.2-16-16s7.2-16 16-16zm96 0h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H400c-8.8 0-16-7.2-16-16s7.2-16 16-16zM224 224a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a64 64 0 1 1 -128 0 64 64 0 1 1 128 0zm96 0a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm32 64a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM48 224H64v32H48c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16H64v32H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zM592 384c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H576V224h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V384h16z"></path></svg>`,
    envelope: `<svg class="svg-inline--fa fa-envelope" aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"></path></svg>`,
    phone: `<svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="far" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 295.2 175.2 485.6 400.1 509.5c9.8 1 19.6 1.8 29.6 2.2c0 0 0 0 0 0c0 0 .1 0 .1 0c6.1 .2 12.1 .4 18.2 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM441.5 464C225.8 460.5 51.5 286.2 48.1 70.5l99.2-21.3 43 100.4L154.4 179c-18.2 14.9-22.9 40.8-11.1 61.2c30.9 53.3 75.3 97.7 128.6 128.6c20.4 11.8 46.3 7.1 61.2-11.1l29.4-35.9 100.4 43L441.5 464zM48 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0s0 0 0 0"></path></svg>`,
    springBoot:`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg fill="#000000" width="40px" height="43px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.094 1.661c-0.448 1.078-1.021 2.094-1.708 3.031-3.010-3.005-7.089-4.693-11.344-4.693-8.802 0-16.042 7.24-16.042 16.042 0 4.391 1.802 8.594 4.984 11.62l0.589 0.526c2.896 2.438 6.552 3.771 10.333 3.776 8.37 0 15.401-6.552 16-14.896 0.438-4.089-0.766-9.255-2.813-15.401zM7.26 27.755c-0.255 0.323-0.651 0.505-1.063 0.505-0.76 0-1.37-0.615-1.375-1.37 0-0.755 0.625-1.375 1.375-1.375 1.151 0.005 1.792 1.344 1.063 2.24zM29.031 22.953c-3.958 5.271-12.417 3.495-17.833 3.75 0 0-0.964 0.057-1.932 0.214 0 0 0.365-0.151 0.833-0.333 3.807-1.323 5.604-1.578 7.917-2.766 4.354-2.214 8.661-7.057 9.557-12.094-1.661 4.849-6.688 9.010-11.266 10.703-3.135 1.156-8.802 2.281-8.802 2.281l-0.229-0.12c-3.859-1.875-3.974-10.229 3.036-12.927 3.068-1.177 6.010-0.531 9.323-1.318 3.542-0.844 7.641-3.5 9.307-6.964 1.865 5.542 4.109 14.214 0.089 19.573z"/></svg>`,
    linkedin: `<svg class="svg-inline--fa fa-linkedin-in" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>`,
    github: `<svg class="svg-inline--fa fa-github" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>`,
    instagram: `<svg class="svg-inline--fa fa-instagram" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>`,
    whatsapp: `<svg class="svg-inline--fa fa-whatsapp" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="whatsapp" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>`,
    twitter: `<svg class="svg-inline--fa fa-x-twitter" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="x-twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>`,
    angular: `<svg class="svg-inline--fa fa-angular" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 223 236"><g clip-path="url(#a)"><path fill="url(#b)" d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"></path><path fill="url(#c)" d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"></path></g><defs><linearGradient id="b" x1="49.009" x2="225.829" y1="213.75" y2="129.722" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor"></stop><stop offset=".24" stop-color="currentColor"></stop><stop offset=".352" stop-color="currentColor"></stop><stop offset=".494" stop-color="currentColor"></stop><stop offset=".745" stop-color="currentColor"></stop><stop offset="1" stop-color="currentColor"></stop></linearGradient><linearGradient id="c" x1="41.025" x2="156.741" y1="28.344" y2="160.344" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor"></stop><stop offset="1" stop-color="currentColor" stop-opacity="0"></stop></linearGradient><clipPath id="a"><path fill="currentColor" d="M0 0h223v236H0z"></path></clipPath></defs></svg>`,
    nextjs: `<svg class="svg-inline--fa fa-nextjs" xmlns="http://www.w3.org/2000/svg" viewBox=".5 -.2 1023 1024.1"><path fill="currentColor" d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z"/><path fill="currentColor" d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z"/></svg>`,
    sass: `<svg class="svg-inline--fa fa-sass" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="sass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M301.84 378.92c-.3.6-.6 1.08 0 0zm249.13-87a131.16 131.16 0 0 0-58 13.5c-5.9-11.9-12-22.3-13-30.1-1.2-9.1-2.5-14.5-1.1-25.3s7.7-26.1 7.6-27.2-1.4-6.6-14.3-6.7-24 2.5-25.29 5.9a122.83 122.83 0 0 0-5.3 19.1c-2.3 11.7-25.79 53.5-39.09 75.3-4.4-8.5-8.1-16-8.9-22-1.2-9.1-2.5-14.5-1.1-25.3s7.7-26.1 7.6-27.2-1.4-6.6-14.29-6.7-24 2.5-25.3 5.9-2.7 11.4-5.3 19.1-33.89 77.3-42.08 95.4c-4.2 9.2-7.8 16.6-10.4 21.6-.4.8-.7 1.3-.9 1.7.3-.5.5-1 .5-.8-2.2 4.3-3.5 6.7-3.5 6.7v.1c-1.7 3.2-3.6 6.1-4.5 6.1-.6 0-1.9-8.4.3-19.9 4.7-24.2 15.8-61.8 15.7-63.1-.1-.7 2.1-7.2-7.3-10.7-9.1-3.3-12.4 2.2-13.2 2.2s-1.4 2-1.4 2 10.1-42.4-19.39-42.4c-18.4 0-44 20.2-56.58 38.5-7.9 4.3-25 13.6-43 23.5-6.9 3.8-14 7.7-20.7 11.4-.5-.5-.9-1-1.4-1.5-35.79-38.2-101.87-65.2-99.07-116.5 1-18.7 7.5-67.8 127.07-127.4 98-48.8 176.35-35.4 189.84-5.6 19.4 42.5-41.89 121.6-143.66 133-38.79 4.3-59.18-10.7-64.28-16.3-5.3-5.9-6.1-6.2-8.1-5.1-3.3 1.8-1.2 7 0 10.1 3 7.9 15.5 21.9 36.79 28.9 18.7 6.1 64.18 9.5 119.17-11.8 61.78-23.8 109.87-90.1 95.77-145.6C386.52 18.32 293-.18 204.57 31.22c-52.69 18.7-109.67 48.1-150.66 86.4-48.69 45.6-56.48 85.3-53.28 101.9 11.39 58.9 92.57 97.3 125.06 125.7-1.6.9-3.1 1.7-4.5 2.5-16.29 8.1-78.18 40.5-93.67 74.7-17.5 38.8 2.9 66.6 16.29 70.4 41.79 11.6 84.58-9.3 107.57-43.6s20.2-79.1 9.6-99.5c-.1-.3-.3-.5-.4-.8 4.2-2.5 8.5-5 12.8-7.5 8.29-4.9 16.39-9.4 23.49-13.3-4 10.8-6.9 23.8-8.4 42.6-1.8 22 7.3 50.5 19.1 61.7 5.2 4.9 11.49 5 15.39 5 13.8 0 20-11.4 26.89-25 8.5-16.6 16-35.9 16-35.9s-9.4 52.2 16.3 52.2c9.39 0 18.79-12.1 23-18.3v.1s.2-.4.7-1.2c1-1.5 1.5-2.4 1.5-2.4v-.3c3.8-6.5 12.1-21.4 24.59-46 16.2-31.8 31.69-71.5 31.69-71.5a201.24 201.24 0 0 0 6.2 25.8c2.8 9.5 8.7 19.9 13.4 30-3.8 5.2-6.1 8.2-6.1 8.2a.31.31 0 0 0 .1.2c-3 4-6.4 8.3-9.9 12.5-12.79 15.2-28 32.6-30 37.6-2.4 5.9-1.8 10.3 2.8 13.7 3.4 2.6 9.4 3 15.69 2.5 11.5-.8 19.6-3.6 23.5-5.4a82.2 82.2 0 0 0 20.19-10.6c12.5-9.2 20.1-22.4 19.4-39.8-.4-9.6-3.5-19.2-7.3-28.2 1.1-1.6 2.3-3.3 3.4-5C434.8 301.72 450.1 270 450.1 270a201.24 201.24 0 0 0 6.2 25.8c2.4 8.1 7.09 17 11.39 25.7-18.59 15.1-30.09 32.6-34.09 44.1-7.4 21.3-1.6 30.9 9.3 33.1 4.9 1 11.9-1.3 17.1-3.5a79.46 79.46 0 0 0 21.59-11.1c12.5-9.2 24.59-22.1 23.79-39.6-.3-7.9-2.5-15.8-5.4-23.4 15.7-6.6 36.09-10.2 62.09-7.2 55.68 6.5 66.58 41.3 64.48 55.8s-13.8 22.6-17.7 25-5.1 3.3-4.8 5.1c.5 2.6 2.3 2.5 5.6 1.9 4.6-.8 29.19-11.8 30.29-38.7 1.6-34-31.09-71.4-89-71.1zm-429.18 144.7c-18.39 20.1-44.19 27.7-55.28 21.3C54.61 451 59.31 421.42 82 400c13.8-13 31.59-25 43.39-32.4 2.7-1.6 6.6-4 11.4-6.9.8-.5 1.2-.7 1.2-.7.9-.6 1.9-1.1 2.9-1.7 8.29 30.4.3 57.2-19.1 78.3zm134.36-91.4c-6.4 15.7-19.89 55.7-28.09 53.6-7-1.8-11.3-32.3-1.4-62.3 5-15.1 15.6-33.1 21.9-40.1 10.09-11.3 21.19-14.9 23.79-10.4 3.5 5.9-12.2 49.4-16.2 59.2zm111 53c-2.7 1.4-5.2 2.3-6.4 1.6-.9-.5 1.1-2.4 1.1-2.4s13.9-14.9 19.4-21.7c3.2-4 6.9-8.7 10.89-13.9 0 .5.1 1 .1 1.6-.13 17.9-17.32 30-25.12 34.8zm85.58-19.5c-2-1.4-1.7-6.1 5-20.7 2.6-5.7 8.59-15.3 19-24.5a36.18 36.18 0 0 1 1.9 10.8c-.1 22.5-16.2 30.9-25.89 34.4z"></path></svg>`,
    typescript: `<svg class="svg-inline--fa fa-typescript" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" role="img"><path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012z"/></svg>`,
    nodejs: `<svg class="svg-inline--fa fa-node-js" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="node-js" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z"></path></svg>`,
    nestjs: `<svg class="svg-inline--fa fa-nest-js" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.58333 255.58751"><path d="m153.33845 45.652481c-1.80934 0-3.48944.387729-5.04032.904673 3.29558 2.19706 5.10493 5.104961 6.00963 8.400551.0648.45233.19386.775444.25856 1.227759.0648.387729.12916.775444.12916 1.163171.2586 5.686509-1.48628 6.397323-2.71403 9.757543-1.87398 4.329529-1.35704 8.982133.90466 12.730079.19387.452318.45234.969275.77546 1.421618-2.45558-16.348759 11.17919-18.804304 13.69932-23.90924.19386-4.458761-3.48944-7.431263-6.39731-9.499092-2.77864-1.680104-5.29884-2.197062-7.62513-2.197062zm20.54903 3.683318c-.25858 1.486247-.0647 1.09853-.12913 1.873973-.0647.516945-.0647 1.163157-.12914 1.680102-.12914.516959-.2586 1.033904-.45236 1.550886-.12913.516945-.32309 1.033903-.51694 1.550847-.2586.516983-.45234.969301-.71082 1.486258-.19385.258585-.32309.516945-.51695.775443-.12914.193857-.25858.387715-.38771.581572-.32309.452355-.64621.904673-.96929 1.292387-.38774.387729-.71083.840046-1.16319 1.163171v.0647c-.38771.3231-.77543.710815-1.22775 1.033903-1.35702 1.033902-2.90787 1.809344-4.32952 2.778644-.45231.323088-.90468.581587-1.29238.9693-.45233.323088-.84006.646176-1.22776 1.033903-.45236.387715-.77545.775442-1.16318 1.227784-.32309.387728-.7108.840048-.96927 1.292402-.32312.452317-.6462.904661-.9047 1.35699-.25857.516944-.45233.969299-.71081 1.486245-.19385.516944-.38773.969301-.51695 1.486244-.19386.581586-.3231 1.098544-.45234 1.615514-.0647.258583-.0647.58156-.12914.840045-.0648.258584-.0648.516945-.12913.775443 0 .516944-.0647 1.09853-.0647 1.615475 0 .387727 0 .775441.0647 1.163169 0 .516946.0647 1.033892.19385 1.615476.0647.516944.19384 1.033902.32312 1.550885.19386.516944.3231 1.033902.51694 1.550847.12916.323126.32309.646213.45236.904673l-14.86252-5.75114c-2.52018-.710815-4.9757-1.35699-7.49588-1.938576-1.357-.323087-2.714-.646198-4.07102-.969299-3.87719-.77543-7.81895-1.356991-11.76076-1.744705-.12913 0-.19385-.06471-.32309-.06471-3.8772-.387714-7.68973-.581572-11.5669-.581572-2.84328 0-5.68656.129131-8.465201.323088-3.941798.258584-7.883602.775442-11.825373 1.421617-.969302.129144-1.938602.323125-2.907905.516984-2.003199.387689-3.941771.840044-5.815742 1.292386-.9693.258584-1.938602.516958-2.907903.775419-.96927.387713-1.87394.84007-2.778642 1.227784-.710811.323088-1.421619.646187-2.132431.9693-.129139.06471-.25858.06471-.32309.129144-.64621.323087-1.22779.581547-1.809341.904671-.193861.06471-.323122.129132-.452351.193859-.71081.323089-1.421618.710803-2.003201 1.033902-.45235.193858-.90467.452343-1.292389.646213-.193862.129131-.452353.258572-.581582.323088-.581579.323088-1.16316.646174-1.680111.9693-.581581.323087-1.098532.646175-1.550882.969263-.452318.323125-.904667.581585-1.29239.904672-.06474.06471-.129139.06471-.193861.129145-.387719.258583-.840039.581571-1.227758.904696 0 0-.06473.0647-.12914.129142-.32309.258584-.646212.516947-.969301.775407-.129138.06471-.258581.193857-.38772.258583-.32309.258586-.64618.581586-.969271.84007-.06473.129143-.193859.193858-.258581.258585-.38772.387715-.775441.710802-1.163161 1.09853-.06473 0-.06473.06471-.129139.129131-.38772.3231-.775439.710816-1.163159 1.098543-.06473.06471-.06473.12913-.12914.12913-.32309.323089-.64618.646213-.969301 1.033902-.129137.129143-.32309.258586-.452319.387715-.32309.387728-.710811.775443-1.09853 1.163171-.06473.129132-.19386.193858-.258582.323087-.516952.516983-.969302 1.033928-1.486252 1.550885-.06473.06471-.129138.129128-.193859.193858-1.033931 1.098529-2.132463 2.197059-3.295594 3.166352-1.163159 1.0339-2.390922 2.0032-3.618711 2.84325-1.292392.9047-2.520152 1.68011-3.877173 2.45555-1.292392.71079-2.649412 1.35701-4.071032 1.9386-1.357022.58157-2.778641 1.09854-4.200264 1.55085-2.714041.58157-5.492684 1.68011-7.883605 1.87397-.51695 0-1.098531.12915-1.615482.19385-.581578.12914-1.098529.25859-1.615479.38774-.516951.19384-1.033931.38771-1.550883.58156-.516951.19386-1.033901.45235-1.550852.71083-.45235.32308-.969299.58157-1.421651.90466-.452322.32309-.904672.7108-1.292393 1.09853-.452319.32312-.904669.77545-1.29239 1.16315-.387721.45237-.77544.84008-1.0985304 1.29239-.3230901.51695-.7108108.96931-.9693016 1.48627-.32309.45235-.6461799.96929-.9046707 1.48622-.2585815.58161-.5169498 1.09855-.7108107 1.68014-.1938599.51695-.3877199 1.09852-.5815799 1.68011-.1291382.51694-.2585813 1.0339-.3230898 1.55083 0 .0648-.064719.12916-.064719.19387-.1291392.58161-.1291392 1.35706-.1938608 1.74479-.064719.45232-.1291373.84002-.1291373 1.29238 0 .25858 0 .58155.064719.84003.064719.45236.1291371.84007.2585814 1.22782.1291382.38766.2585815.77539.4523201 1.16312v.0647c.1938599.38775.4523506.77545.7108108 1.16317.2585814.38772.5169804.77544.8400704 1.16317.3230899.32309.7108109.71078 1.0985304 1.03389.3877209.38772.7754421.71081 1.2277611 1.0339 1.550881 1.35703 1.938601 1.80938 3.941806 2.84327.323087.19387.64621.32311 1.03393.51697.06473 0 .129139.0647.193859.0647 0 .12913 0 .19387.06473.32313.06472.51696.193859 1.03389.32309 1.55086.129138.58158.323121 1.09855.516981 1.55087.19386.38773.32309.77543.516951 1.16317.06472.12915.12914.25858.19386.32309.258581.51694.51695.96932.77541 1.42162.323121.45233.64621.90466.969299 1.35703.323092.3877.710813.84004 1.098532 1.22775.387721.38773.775442.71083 1.227793 1.09852 0 0 .06473.0648.129137.0648.387722.32312.77544.64622 1.163162.90466.45232.32311.90467.58157 1.421619.84007.452351.25858.969302.51695 1.486252.71082.387721.19386.84004.32311 1.292392.45234.06473.0648.129138.0648.258582.12916.258581.0648.581548.12912.840039.19384-.193859 3.48945-.258582 6.78504.258583 7.94822.58155 1.29238 3.424821-2.64941 6.268094-7.17277-.387719 4.45875-.646211 9.6929 0 11.24381.710809 1.61545 4.587982-3.42487 7.948203-8.98215 45.815262-10.59757 87.62418 21.066 92.01829 65.78273-.84006-6.97892-9.43446-10.85608-13.37623-9.88677-1.93861 4.78183-5.2342 10.92068-10.53299 14.73324.45233-4.2649.25856-8.65901-.64619-12.92392-1.42165 5.94501-4.2003 11.50232-8.01287 16.28415-6.138857.45232-12.277729-2.52019-15.50872-6.97891-.258582-.19388-.323091-.58159-.516951-.84006-.193862-.45238-.387719-.90467-.516951-1.35703-.193859-.45232-.323089-.90467-.387719-1.35699-.06473-.45236-.06473-.90469-.06473-1.42163 0-.32312 0-.6462 0-.96928.06473-.45238.19386-.90471.323091-1.35705.129138-.45232.25858-.90467.45235-1.35701.258582-.45231.45232-.90466.775441-1.35698 1.09853-3.10178 1.09853-5.62192-.90467-7.10816-.387721-.25858-.775441-.45236-1.227791-.64622-.258584-.0647-.581582-.19386-.84004-.25857-.193861-.0647-.32309-.12916-.516951-.19387-.452351-.12914-.904702-.25859-1.357022-.32309-.45235-.12913-.90467-.19386-1.35702-.19386-.452321-.0648-.969303-.12914-1.421622-.12914-.323089 0-.64621.0647-.969301.0647-.516949 0-.969299.0648-1.421621.19386-.45235.0648-.904669.12913-1.357019.25856-.452322.12915-.904673.25859-1.357023.45238-.452319.19385-.840041.38771-1.292389.58157-.38769.19387-.775412.45232-1.227761.64618-15.056371 9.82217-6.074235 32.82674 4.200264 39.48256-3.877175.71081-7.818947 1.5509-8.917479 2.39092-.06473.0647-.129138.12915-.129138.12915 2.778642 1.68009 5.686516 3.10173 8.723616 4.32949 4.135665 1.35702 8.529786 2.58479 10.468387 3.10176v.0647c5.363424 1.09854 10.79148 1.48626 16.284139 1.16317 28.62649-2.00321 52.0834-23.78003 56.3483-52.47111.12914.58159.25858 1.09852.38772 1.68012.19387 1.16312.45232 2.3909.58155 3.61867v.0648c.12914.58158.19386 1.16315.25858 1.6801v.25859c.0648.58157.12915 1.16316.12915 1.6801.0647.71082.12914 1.42162.12914 2.13247v1.0339c0 .32312.0647.7108.0647 1.03392 0 .38773-.0647.77542-.0647 1.16314v.90467c0 .45236-.0648.84006-.0648 1.2924 0 .25856 0 .51696-.0647.84006 0 .45236-.0647.90466-.0647 1.42162-.0648.19386-.0648.38772-.0648.58159-.0647.51696-.12914.9693-.19387 1.48626 0 .19387 0 .38771-.0647.58159-.0648.64617-.19385 1.22777-.25855 1.87394v.0648.0647c-.12914.58157-.2586 1.22776-.38775 1.80933v.19387c-.12912.58156-.25858 1.16316-.3877 1.74471 0 .0648-.0647.19387-.0647.25856-.12916.5816-.2586 1.16317-.45232 1.74478v.19384c-.19386.64617-.38773 1.22776-.51698 1.80934-.0647.0647-.0647.12914-.0647.12914-.19387.64621-.38771 1.29239-.58155 1.93858-.25858.64621-.45234 1.22778-.71081 1.87398-.25857.6462-.45236 1.2924-.71083 1.87396-.25859.64622-.51697 1.2278-.77543 1.87397h-.0648c-.2586.58157-.51699 1.22779-.8401 1.80938-.0647.19383-.12912.32309-.19384.4523-.0647.0648-.0647.12914-.12914.19388-4.20026 8.46514-10.40377 15.89639-18.15809 21.71217-.51695.32309-1.03392.71082-1.55086 1.09852-.12915.12915-.32312.19388-.45235.32309-.45235.3231-.90468.64618-1.42161.96931l.19385.38772h.0647c.90466-.12913 1.80934-.25858 2.71402-.38772h.0647c1.68012-.25858 3.36023-.58158 5.04035-.90467.45231-.0648.9693-.19385 1.42161-.32312.32309-.0648.58158-.12913.90467-.19386.45235-.0648.90468-.19386 1.35704-.25857.3877-.12914.77543-.19388 1.16314-.3231 6.46195-1.55089 12.73007-3.68335 18.73965-6.20349-10.27448 14.02243-24.03847 25.33087-40.12874 32.76212 7.43127-.51696 14.86251-1.74472 22.03528-3.81254 26.0417-7.68977 47.94772-25.20165 61.06549-48.7878-2.6494 14.92714-8.5944 29.14344-17.38265 41.55041 6.26809-4.13569 12.01923-8.91753 17.25342-14.34557 14.47478-15.12097 23.97388-34.31296 27.20483-54.92665 2.19708 10.2099 2.84328 20.74293 1.87398 31.14666 46.65534-65.07192 3.87717-132.53476-14.02244-150.305141-.0648-.129133-.12914-.193858-.12914-.323089-.0648.0647-.0648.0647-.0648.129144 0-.06471 0-.06471-.0647-.129144 0 .775442-.0647 1.550848-.12914 2.326291-.19387 1.48625-.38771 2.907879-.64621 4.329529-.32308 1.42162-.71081 2.84322-1.09854 4.26488-.45232 1.35699-.96925 2.77862-1.55085 4.13565-.58158 1.29237-1.22778 2.64939-1.93859 3.9418-.71082 1.22778-1.48625 2.52016-2.32629 3.6833-.84006 1.2278-1.74474 2.39093-2.64943 3.48944-.96931 1.16318-2.00319 2.1971-3.03712 3.23101-.64618.58158-1.22775 1.09853-1.87398 1.61546-.51694.45236-.96927.84009-1.48625 1.29239-1.16314.90468-2.32629 1.74474-3.61867 2.52019-1.22778.77542-2.52014 1.55086-3.81254 2.19707-1.35702.64619-2.71404 1.22776-4.07104 1.80935-1.35702.51693-2.77864.96928-4.20031 1.35701-1.42161.3877-2.90785.71081-4.32949.96928-1.48623.25858-2.97249.38771-4.39412.51697-1.03392.0647-2.06782.12915-3.10175.12915-1.48626 0-2.97248-.12915-4.39412-.25858-1.48624-.12914-2.97251-.32314-4.39413-.64623-1.48625-.25858-2.9079-.64621-4.32953-1.09851h-.0647c1.42163-.12914 2.84327-.2586 4.26492-.51697 1.48622-.25858 2.90785-.58156 4.3295-.96931 1.42162-.38771 2.84325-.84006 4.20026-1.357 1.42162-.51696 2.77865-1.16313 4.07105-1.80936 1.357-.64621 2.58478-1.357 3.87716-2.13244 1.22776-.84005 2.45554-1.68009 3.61869-2.58479 1.16316-.90466 2.26167-1.87394 3.29562-2.90786 1.09853-.96932 2.06781-2.06784 3.03711-3.16638.96927-1.16312 1.87396-2.32628 2.71402-3.48944.12915-.19387.25859-.45232.38774-.64619.64617-1.03392 1.29235-2.06783 1.87392-3.10176.71083-1.29239 1.35704-2.58479 1.9386-3.94177.58159-1.35702 1.09855-2.71405 1.55089-4.13566.45232-1.35703.77542-2.77864 1.09853-4.200258.25859-1.486258.51694-2.90791.64619-4.329528.12914-1.486244.25857-2.972503.25857-4.394119 0-1.033928-.0648-2.06783-.12912-3.101733-.12915-1.486246-.32311-2.9079-.51696-4.329519-.25859-1.486257-.58157-2.907873-.96931-4.329529-.45231-1.356991-.90467-2.778634-1.42161-4.135623-.51699-1.357028-1.16315-2.714042-1.80938-4.006443-.71081-1.292388-1.42161-2.584776-2.19704-3.812536-.84005-1.22776-1.68013-2.390917-2.5848-3.554087-.96927-1.098531-1.93857-2.19706-2.97251-3.29559-.51694-.516947-1.09853-1.098532-1.6801-1.615476-2.90787-2.2617-5.945-4.394159-8.9821-6.332732-.45233-.258574-.84005-.452342-1.2924-.646212-2.13246-1.356992-4.13566-2.067831-6.13885-2.714007z" fill="currentColor" fill-rule="evenodd" transform="translate(0 -41.412487)"/></svg>`,
    tailwindcss: `<svg class="svg-inline--fa fa-tailwindcss" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" fill="currentColor"/></svg>`,
    shopify: `<svg class="svg-inline--fa fa-shopify" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 292" preserveAspectRatio="xMidYMid"><path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z" fill="currentColor"/><path d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357" fill="currentColor"/><path d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338" fill="#FFF"/></svg>`,
  };

  public ngOnInit() {
    this.elementRef.nativeElement.classList.add('icon');

    const svgIcon = this.sanitizer.bypassSecurityTrustHtml(
      this.icon[this.name] || this.notIcon
    );

    this.elementRef.nativeElement.innerHTML =
      this.createSvgElement(svgIcon).outerHTML;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['name']) {
      this.ngOnInit();
    }
  }

  private createSvgElement(svgHtml: SafeHtml): SVGElement {
    const div = this.renderer.createElement('div');
    div.innerHTML = svgHtml.toString();
    const svg = div.querySelector('svg');
    return svg;
  }
}
