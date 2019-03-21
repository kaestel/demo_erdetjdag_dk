var AnimatedCore=new function(){this.defaultConfig={maxLoops:3,maxAnimationTime:30,isPoliteBanner:!1,politeLoadDelay:1e3,clickProperty:{clickTag:"clickTag",url:"https://example.com"},renderer:{scale:!1,containerSelector:"#Animated",backgroundColor:14935011,assetsBaseUrl:"images/",transparent:!1,antialias:!1},consoleAd:!1,rightClickAd:!1},this.init=function(){this._b=new AnimatedBanner,this.config=AnimatedUtils.extendObject(this.defaultConfig,this._b.config||{}),this._c=document.querySelector(this.config.renderer.containerSelector),this._cs=this._c.style,this.stage=new PIXI.Container,this.loader=new PIXI.loaders.Loader(this.config.renderer.assetsBaseUrl),this.renderer=PIXI.autoDetectRenderer(this.config.width,this.config.height,this.config.renderer),this.renderer.plugins.interaction.autoPreventDefault=!1,this.renderer.view.style.width="100%",this.renderer.view.style.display="block",this.renderer.view.style.position="relative",this.renderer.view.style.zIndex="50",this._cs.position="relative",this.config.renderer.scale?this._cs.width="100%":this.config.renderer.resize?(window.addEventListener("resize",this.resized.bind(this)),this.resized()):(this._cs.width=this.config.width+"px",this._cs.height=this.config.height+"px"),!1===this.config.fallback||this.webgl()?(this.loops=1,this._b.stage=this.stage,this._b.renderer=this.renderer,this._b.assets={},this.config.maxAnimationTime&&Tween.delayedCall(this.config.maxAnimationTime,this.stopBanner.bind(this)),this.config.consoleAd&&console.log("Hungry for more AD attention? We are Animated - https://animated.dk"),this.config.rightClickAd&&this.rightClickCapture(this._c),Tween.defaultEase=Quad.easeOut,this.setupAssetLoading()):this.fallback()},this.setupAssetLoading=function(){this.config.isPoliteBanner?"Adform"==this.config.bannerType&&"object"==typeof dhtml&&0!==dhtml.getVar("bn",0)?(dhtml.sharedEvents.once("pageLoadComplete",this.loadAssets.bind(this)),dhtml.external.initPoliteMode()):setTimeout(this.loadAssets.bind(this),this.config.politeLoadDelay):this.loadAssets()},this.loadAssets=function(){if(this._preload_graphics=[],this._preload_fonts=[],this._preload_video=[],this._preload_audio=[],this._b.loadQueue&&this._b.loadQueue.length){var e,t;for(e=0;t=this._b.loadQueue[e];e++)"object"==typeof t&&t.family?this._preload_fonts.push(t):this._preload_graphics.push(t);if(this._preload_graphics.length){for(e=0;t=this._preload_graphics[e];e++)this.loader.add(t);this.loader.load(this.graphicAssetsLoaded.bind(this))}this._preload_fonts.length&&("object"==typeof AnimatedFonts?AnimatedFonts.preload(this._preload_fonts,{callback:this.fontAssetsLoaded.bind(this)}):console.log("AnimatedFonts module missing"))}else this.assetsLoadCheck()},this.graphicAssetsLoaded=function(e,t){if(e&&t){t=AnimatedUtils.convertResources(t);this._b.assets=AnimatedUtils.extendObject(this._b.assets,t),this._preload_graphics=[]}this.assetsLoadCheck()},this.fontAssetsLoaded=function(e){e&&(this._preload_fonts=[]),this.assetsLoadCheck()},this.assetsLoadCheck=function(){this._preload_graphics.length||this._preload_fonts.length||(this._c.appendChild(this.renderer.view),this.ready())},this.resized=function(e){this.banner_w=document.documentElement.clientWidth,this.banner_h=document.documentElement.clientHeight,this._cs.width=this.banner_w+"px",this._cs.height=this.banner_h+"px",this.renderer.resize(this.banner_w,this.banner_h),"function"==typeof this._b.resized&&this._b.resized(e)},this.ready=function(){this._b.init(),this.config.renderer.resize&&this.resized(),this.setupClickTag(),this._b.start(),this.render()},this.stopBanner=function(){window.cancelAnimationFrame(this._af),this._b.onBannerStopped()},this.render=function(){this._af=window.requestAnimationFrame(this.render.bind(this)),this._b.onBannerRender(),this.renderer.render(this.stage)},this.remainingLoops=function(){return this.config.maxLoops-this.loops},this.setupClickTag=function(){"function"==typeof this._b.setupClickTag?this._b.setupClickTag():(this._o=this._c.appendChild(document.createElement("div")),_os=this._o.style,_os.position="absolute",_os.zIndex=100,_os.top=0,_os.left=0,_os.width="100%",_os.height="100%",_os.cursor="pointer",this._o.addEventListener("click",function(){this.click(this.config.clickProperty)}.bind(this)))},this.button=function(e,t){e.__clickProperty=AnimatedUtils.extendObject({},this.config.clickProperty,t),e.interactive=!0,e.buttonMode=!0,e.defaultCursor="pointer",e.on("click",function(){AnimatedCore.click(this.__clickProperty)}),e.on("tap",function(){AnimatedCore.click(this.__clickProperty)})},this.click=function(e){switch(this.config.bannerType){case"Adform":this.AdformClick(e);break;case"Google":this.GoogleClick(e);break;case"Adtech":this.AdtechClick(e);break;case"DR":this.DRClick(e);break;default:this.NeutralClick(e)}},this.NeutralClick=function(e){var t=e.url,i=e.target||"_blank";window.open(t,i)},this.AdformClick=function(e){if(mraid)mraid.open(Adform.getClickURL(e.clickTag));else{var t=dhtml.getVar(e.clickTag,e.url),i=dhtml.getVar("landingPageTarget",e.target||"_blank");window.open(t,i)}},this.AdtechClick=function(){var e=window.bannerClick;window.open(e,"_blank")},this.GoogleClick=function(e){var t=window[e.clickTag],i=e.target||"_blank";window.open(t,i)},this.DRClick=function(e){var t=e.url,i=e.target||"_parent";window.open(t,i)},this.webgl=function(){var e=0,t=["webgl","experimental-webgl","moz-webgl","webkit-3d"];if(window.WebGLRenderingContext)for(var i=document.createElement("canvas");engine=t[e++];)try{return i.getContext(engine),!0}catch(e){}return!1},this.fallback=function(){"function"==typeof this._b.fallback?this._b.fallback():(this.config.fallback?this._cs.background="transparent url("+this.config.fallback+") no-repeat top left":this._cs.backgroundColor="transparent",this._b.renderer&&this._b.renderer.view&&(this._b.renderer.view.style.opacity=0),delete this._b.setupClickTag,this.setupClickTag())},this.rightClickCapture=function(e){e.addEventListener("contextmenu",function(e){e.preventDefault();var t=this._c.appendChild(document.createElement("div"));t.innerHTML="Animated.dk",s=t.style,s.position="absolute",s.top=e.layerY+5+"px",s.left=e.layerX+5+"px",s.background="#ffffff url(https://c3a3f6ddc4a2df3cff69-7a47f5667562d2cfc9b43d84f63042bf.ssl.cf3.rackcdn.com/logo.gif) no-repeat 18px -10px",s.backgroundSize="70% auto",s.color="#000000",s.fontSize="9px",s.lineHeight="100px",s.textAlign="center",s.zIndex=101,s.fontFamily="Arial",s.width="70px",s.height="70px",s.borderRadius="35px",document.body.rightClickAd=t,setTimeout(this.rightClickRemove.bind(this),2e3)}.bind(this),!1),document.body.addEventListener("mousedown",this.rightClickRemove.bind(this),!1)},this.rightClickRemove=function(e){document.body.rightClickAd&&(document.body.rightClickAd.parentNode.removeChild(document.body.rightClickAd),delete document.body.rightClickAd)}};"undefined"!=typeof TweenLite&&(Tween=TweenLite),"undefined"!=typeof PIXI&&PIXI.utils.skipHello(),window.addEventListener("load",AnimatedCore.init.bind(AnimatedCore));var AnimatedMath=new function(){this.getAngleBetweenObjects=function(e,t){var i=t.x-e.x,n=t.y-e.y;return Math.atan2(n,i)*PIXI.DEG_TO_RAD},this.getNextPointInDirection=function(e,t,i){var n=e.clone();return n.x+=Math.cos(t*PIXI.DEG_TO_RAD)*i,n.y+=Math.sin(t*PIXI.DEG_TO_RAD)*i,n},this.getDistanceBetween=function(e,t){var i=t.x-e.x,n=t.y-e.y,s=Math.pow(i,2)+Math.pow(n,2);return Math.sqrt(s)},this.randomBetween=function(e,t){return e instanceof PIXI.Point&&(t=e.y,e=e.x),Math.floor(Math.random()*(t-e+1)+e)}},AnimatedUtils=new function(){this.extendObject=function(e){var t,i;for(e=e||{},t=1;t<arguments.length;t++){var n=arguments[t];if(n)for(i in n)n.hasOwnProperty(i)&&(e[i]=n[i])}return e},this.convertResources=function(e){var t,i={};for(t in e)if(e.hasOwnProperty(t)){var n,s,o=e[t];if(t.match(/\.json$/)||t.match(/\.json_image$/)){if(o.type===PIXI.loaders.Resource.TYPE.JSON&&o.data&&"object"==typeof o.data.frames)for(n in o.data.frames)s=PIXI.extras.AnimatedSprite.fromFrames([n]),n.match(/\//)&&(n=n.replace(/.+\//,"")),-1!=n.indexOf(".")&&(n=n.split(".")[0]),i[n]=s}else o.type===PIXI.loaders.Resource.TYPE.IMAGE?(t.match(/\//)&&(t=t.replace(/.+\//,"")),-1!=t.indexOf(".")&&(t=t.split(".")[0]),i[t]=new PIXI.Sprite(o.texture)):console.log("UNRECOGNIZED ASSET: "+t)}return i}};