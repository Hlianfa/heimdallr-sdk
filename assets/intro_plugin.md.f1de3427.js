import{_ as l,c as s,o as a,N as e}from"./chunks/framework.ea74715b.js";const C=JSON.parse('{"title":"插件","description":"","frontmatter":{},"headers":[],"relativePath":"intro/plugin.md"}'),o={name:"intro/plugin.md"},n=e(`<h1 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h1><p>当前仅有 Browser 基座与 Wx 基座的插件</p><p>篇幅有限，只能罗列一下了，没法一个个单独讲</p><h2 id="for-browser" tabindex="-1">For Browser <a class="header-anchor" href="#for-browser" aria-label="Permalink to &quot;For Browser&quot;">​</a></h2><p>Browser 基座的所有插件均提供 CDN 与 NPM 两种引入方式</p><ul><li>@heimdallr-sdk/console：监听浏览器控制台的输出并上报，debug 为 false 时，控制台所有信息都不会打印</li><li>@heimdallr-sdk/customer：自动读取存储在 cookie、localStorage、sessionStorage、window 上的数据并上报，同时也可以通过调用 <code>window.HEIMDALLR_REPORT(type: string, data: any)</code> 手动上报</li><li>@heimdallr-sdk/dom：监听页面的点击事件并上报</li><li>@heimdallr-sdk/fetch：监听页面发起的 fetch 请求，reportResponds 为 true 时，将连同接口返回值一同上报</li><li>@heimdallr-sdk/xhr：监听页面发起的 XMLHttpRequest 请求，reportResponds 为 true 时，将连同接口返回值一同上报</li><li>@heimdallr-sdk/hash：监听页面路由的 hash 变化，记录来源与跳转地址并上报</li><li>@heimdallr-sdk/history：监听页面路由的变化，包括手动点击浏览器按钮的跳转，自动记录来源与跳转地址并上报</li><li>@heimdallr-sdk/performance：页面性能监控，可以得到下列性能指标 <ul><li>dnsSearch: DNS 解析耗时</li><li>tcpConnect: TCP 连接耗时</li><li>sslConnect: SSL 安全连接耗时</li><li>request: TTFB 网络请求耗时</li><li>response: 数据传输耗时</li><li>parseDomTree: DOM 解析耗时</li><li>resource: 资源加载耗时</li><li>domReady: DOM Ready</li><li>httpHead: http 头部大小</li><li>interactive: 首次可交互时间</li><li>complete: 页面完全加载</li><li>redirect: 重定向次数</li><li>redirectTime: 重定向耗时</li><li>duration</li><li>fp: 渲染出第一个像素点，白屏时间</li><li>fcp: 渲染出第一个内容，首屏结束时间</li><li>fmp: 有意义内容渲染时间</li><li>fps: 刷新率</li><li>lcp: 最大内容渲染时间，2.5s 内</li><li>fid: 交互性能，应小于 100ms</li><li>cls: 视觉稳定性，应小于 0.1</li><li>resource: 页面资源加载耗时</li></ul></li><li>@heimdallr-sdk/record：录制当前会话所有操作并上报</li><li>@heimdallr-sdk/page_crash：监听页面崩溃，需配合 <code>@heimdallr-sdk/page-crash-worker</code> 使用，不走基座的上报与数据转换，在 page-crash-worker 文件中使用 get 方法上报崩溃数据。从命名就能看出来，核心原理就是使用 Worker (狗头)</li><li>@heimdallr-sdk/vue：捕获 vue 抛出的错误并上报，支持 sourcemap（需上传 sourcemap 文件）</li></ul><h2 id="for-wx" tabindex="-1">For Wx <a class="header-anchor" href="#for-wx" aria-label="Permalink to &quot;For Wx&quot;">​</a></h2><p>小程序基座的插件较少，但也不太需要那么多，毕竟小程序自己就有一套性能、错误监控；因此，只写了几个常用但小程序没提供的监控插件</p><ul><li>@heimdallr-sdk/wx-dom：监听小程序的点击事件，记录触发的函数名以及附带信息并上报</li><li>@heimdallr-sdk/wx-request：监听小程序发起的请求，包括 request、downloadFile、uploadFile，同样可通过 reportResponds 配置决定是否上报接口返回结果</li><li>@heimdallr-sdk/wx-route：捕获小程序的路由跳转，记录来源、跳转地址与跳转状态（成功与否）并上报</li></ul><h2 id="自定义插件" tabindex="-1">自定义插件 <a class="header-anchor" href="#自定义插件" aria-label="Permalink to &quot;自定义插件&quot;">​</a></h2><p>插件本质上就是一个个 Plugin 类型对象</p><p>基础的 Plugin 类型如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BasePluginType</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">monitor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">notify</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">collectedData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">transform</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">collectedData</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReportDataType</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li>name: 当前插件名称（反正不能写中文）</li><li>monitor: 插件逻辑的具体实现放在这个函数体中 <ul><li>notify 函数负责将数据上报，collectedData 还不是最终上报到服务器的数据，会在基座的 transform 内包装一下再上报</li></ul></li><li>transform: 可选配置，即接收 notify 中上报的数据，在这里转换一下；最终也是会到基座的 transform 方法内做最后的“包装”</li></ul><p>因此，只需要实现并返回一个符合 BasePluginType 的对象，即可接入到 heimdallr-sdk 的基座中作为插件使用</p>`,15),r=[n];function p(t,i,c,d,y,D){return a(),s("div",null,r)}const h=l(o,[["render",p]]);export{C as __pageData,h as default};
