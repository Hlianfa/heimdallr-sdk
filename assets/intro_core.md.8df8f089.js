import{_ as e,c as o,o as a,N as r}from"./chunks/framework.ea74715b.js";const m=JSON.parse('{"title":"核心","description":"","frontmatter":{},"headers":[],"relativePath":"intro/core.md"}'),l={name:"intro/core.md"},i=r('<h1 id="核心" tabindex="-1">核心 <a class="header-anchor" href="#核心" aria-label="Permalink to &quot;核心&quot;">​</a></h1><h2 id="core" tabindex="-1">Core <a class="header-anchor" href="#core" aria-label="Permalink to &quot;Core&quot;">​</a></h2><p>Core 是 SDK 的核心抽象类，完成一些基础的初始化操作，负责提供 SDK 内与平台无关的代码，同时规范各个客户端的属性与方法。</p><p>Core 主要做了以下事情</p><ol><li>完成 SDK 配置项的初始化与绑定</li><li>实现引用插件的功能</li><li>使用发布订阅模式完成日志的捕获与上报</li><li>统一控制台的输出方法</li><li>提供面包屑功能，给各个插件使用（暂不支持手动增加面包屑，可以使用 @heimdallr-sdk/customer 上报）</li><li>规范初始化应用方法，各客户端所需的应用信息不一致，因此这里只提供抽象方法，需要各个客户端自己实现</li><li>规范数据转换方法，与上一条一样，这里也只提供抽象方法，需要客户端自行实现</li><li>规范数据上报方法，因为不同客户端支持的网络请求方式不一致，如：浏览器端有多种网络请求 API 可用，而 wx 只能使用 wx.request 方法发起请求，因此这里也只提供抽象方法，得客户端自己实现</li></ol><h2 id="client" tabindex="-1">Client <a class="header-anchor" href="#client" aria-label="Permalink to &quot;Client&quot;">​</a></h2><p>Client 即客户端，也就是在不同平台使用的 sdk 基座</p><h3 id="browser" tabindex="-1">Browser <a class="header-anchor" href="#browser" aria-label="Permalink to &quot;Browser&quot;">​</a></h3><p>Browser 即浏览器端的监控基座，以浏览器为载体的应用都可以使用该基座</p><p>继承自 Core 抽象类，实现了 Core 中的抽象方法：</p><ul><li>初始化应用</li><li>数据转换</li><li>数据上报：支持 sendBeacon、图片上报、get 三种上报方式，默认使用 sendBeacon</li></ul><p>Browser 基座同时内置了错误监控 sdk，以内置插件的方式集成在基座中，可以监听到以下三种类型的错误：</p><ul><li>代码错误（支持 sourcemap，需上传 sourcemap 文件）</li><li>资源加载错误</li><li>代码中未捕获的错误</li></ul><p>此外还监听了页面的加载与卸载，作为一次访问会话上报，以页面加载作为会话开始、页面卸载视为会话结束</p><p>Browser 基座支持 CDN 与 NPM 两种引入方式，这也就意味着绝大多数技术栈的前端应用都可以使用该基座</p><h3 id="node" tabindex="-1">Node <a class="header-anchor" href="#node" aria-label="Permalink to &quot;Node&quot;">​</a></h3><p>Node 即 nodejs 服务端的监控基座</p><p>同样继承自 Core 抽象类，实现了应用初始化、上报数据最后的转换、数据上报三个方法</p><p>这里的上报方式使用了第三方库来实现，<code>node-fetch</code></p><p>Node 基座同样默认集成了错误监听的能力，监听了 <code>uncaughtException</code> 的错误并上报</p><p>Node 服务端一般不以“会话”为监控维度，更关注接口与服务器性能，因此没有 Browser 中的“会话”的概念</p><p>该基座可以通过 NPM 方式引入</p><h3 id="wx" tabindex="-1">Wx <a class="header-anchor" href="#wx" aria-label="Permalink to &quot;Wx&quot;">​</a></h3><p>Wx 即微信小程序的监控基座</p><p>老规矩，继承自 Core 抽象类，实现初始化、转换、上报三个方法</p><p>同样的，Wx 基座也集成了基础的错误监控，本质上就是重写了 <code>APP.onError</code>，捕获到错误并上报</p><p>与 Browser 最大的区别就是如何监听一个完整的会话，这里人为规定以 onShow 为一次会话的开始，以 onHide 为一次会话的结束，同时提供了两种方式去监听会话：</p><ol><li>提供 <code>trace</code> 函数，在每个页面的 onShow 与 onHide 方法内手动添加埋点</li><li>重写小程序的 Page 方法，返回 <code>heimdallrPage</code> 方法，在页面中直接使用 heimdallrPage 替代 Page 方法</li></ol><p>通过 NPM 方式引入，引入方式参考微信官方文档啦</p>',29),t=[i];function d(n,c,p,s,h,u){return a(),o("div",null,t)}const P=e(l,[["render",d]]);export{m as __pageData,P as default};
