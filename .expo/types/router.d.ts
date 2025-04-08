/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/Login`; params?: Router.UnknownInputParams; } | { pathname: `/Mapa`; params?: Router.UnknownInputParams; } | { pathname: `/Otp`; params?: Router.UnknownInputParams; } | { pathname: `/camera`; params?: Router.UnknownInputParams; } | { pathname: `/camera/style`; params?: Router.UnknownInputParams; } | { pathname: `/imagem`; params?: Router.UnknownInputParams; } | { pathname: `/imagem/styles`; params?: Router.UnknownInputParams; } | { pathname: `/registo`; params?: Router.UnknownInputParams; } | { pathname: `/Aprender/aprender`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/Login`; params?: Router.UnknownOutputParams; } | { pathname: `/Mapa`; params?: Router.UnknownOutputParams; } | { pathname: `/Otp`; params?: Router.UnknownOutputParams; } | { pathname: `/camera`; params?: Router.UnknownOutputParams; } | { pathname: `/camera/style`; params?: Router.UnknownOutputParams; } | { pathname: `/imagem`; params?: Router.UnknownOutputParams; } | { pathname: `/imagem/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/registo`; params?: Router.UnknownOutputParams; } | { pathname: `/Aprender/aprender`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/Login${`?${string}` | `#${string}` | ''}` | `/Mapa${`?${string}` | `#${string}` | ''}` | `/Otp${`?${string}` | `#${string}` | ''}` | `/camera${`?${string}` | `#${string}` | ''}` | `/camera/style${`?${string}` | `#${string}` | ''}` | `/imagem${`?${string}` | `#${string}` | ''}` | `/imagem/styles${`?${string}` | `#${string}` | ''}` | `/registo${`?${string}` | `#${string}` | ''}` | `/Aprender/aprender${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/Login`; params?: Router.UnknownInputParams; } | { pathname: `/Mapa`; params?: Router.UnknownInputParams; } | { pathname: `/Otp`; params?: Router.UnknownInputParams; } | { pathname: `/camera`; params?: Router.UnknownInputParams; } | { pathname: `/camera/style`; params?: Router.UnknownInputParams; } | { pathname: `/imagem`; params?: Router.UnknownInputParams; } | { pathname: `/imagem/styles`; params?: Router.UnknownInputParams; } | { pathname: `/registo`; params?: Router.UnknownInputParams; } | { pathname: `/Aprender/aprender`; params?: Router.UnknownInputParams; };
    }
  }
}
