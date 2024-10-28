"use strict";
var FLIPBOOKPROCOM = FLIPBOOKPROCOM || {}
    , PRESENTATION = FLIPBOOKPROCOM;
!function (e, t) {
    function n() {
        A = function (e) {
            function n(n) {
                function o() {
                    a.renderRequestPending = !0
                }

                n = n || {};
                var a = this;
                e.call(this, n),
                    a.options = n,
                    a.canvas = t(a.renderer.domElement).addClass("df-3dcanvas"),
                    a.container = n.container,
                    a.container.append(a.canvas),
                    a.type = "PreviewStage",
                    a.mouse = new THREE.Vector2,
                    a.raycaster = new THREE.Raycaster,
                    a.camera.position.set(0, 20, 600),
                    a.camera.lookAt(new THREE.Vector3(0, 0, 0)),
                    a.spotLight.position.set(-220, 330, 550),
                    a.spotLight.castShadow = !T && n.webglShadow,
                a.spotLight.shadow && (a.spotLight.shadow.bias = -8e-4),
                    a.spotLight.intensity = h(n.spotLightIntensity, i.spotLightIntensity),
                    a.ambientLight.color = new THREE.Color(h(n.ambientLightColor, i.ambientLightColor)),
                    a.ambientLight.intensity = h(n.ambientLightIntensity, i.ambientLightIntensity);
                var r = new THREE.ShadowMaterial;
                r.opacity = h(n.shadowOpacity, i.shadowOpacity),
                    a.ground.material = r,
                    a.ground.position.z = -2,
                    a.orbitControl.maxAzimuthAngle = .4,
                    a.orbitControl.minAzimuthAngle = -.4,
                    a.orbitControl.minPolarAngle = 1.4,
                    a.orbitControl.maxPolarAngle = 2.2,
                    a.orbitControl.mouseButtons.ORBIT = THREE.MOUSE.RIGHT,
                    a.orbitControl.mouseButtons.PAN = -1,
                    a.orbitControl.maxDistance = 5e3,
                    a.orbitControl.minDistance = 50,
                    a.orbitControl.noZoom = !0,
                    a.selectiveRendering = !0,
                    a.orbitControl.zoomSpeed = 5,
                    a.orbitControl.keyPanSpeed = 0,
                    a.orbitControl.center.set(0, 0, 0),
                    a.orbitControl.update(),
                    a.swipe_threshold = T ? 15 : 20;
                var l = a.cssRenderer = new THREE.CSS3DRenderer;
                t(l.domElement).css({
                    position: "absolute",
                    top: 0,
                    pointerEvents: "none"
                }).addClass("df-3dcanvas df-csscanvas"),
                    a.container[0].appendChild(l.domElement);
                var c = a.cssScene = new THREE.Scene
                    , u = document.createElement("div");
                u.className = "df-page-content df-page-content-left";
                var p = document.createElement("div");
                p.className = "df-page-content df-page-content-right";
                var g = c.divLeft = new THREE.CSS3DObject(u)
                    , f = c.divRight = new THREE.CSS3DObject(p);
                c.add(g),
                    c.add(f),
                    a.resizeCallback = function () {
                        l.setSize(a.canvas.width(), a.canvas.height())
                    }
                    ,
                    window.addEventListener(d.move, o, !1),
                    window.addEventListener("keyup", o, !1),
                    a.dispose = function () {
                        a.clearChild(),
                            a.render(),
                            window.removeEventListener(d.move, o, !1),
                        1 == a.options.scrollWheel && (a.renderer.domElement.removeEventListener("mousewheel", m, !1),
                            a.renderer.domElement.removeEventListener("DOMMouseScroll", m, !1)),
                            window.removeEventListener("keyup", o, !1),
                            a.renderer.domElement.removeEventListener("mousemove", v, !1),
                            a.renderer.domElement.removeEventListener("touchmove", v, !1),
                            a.renderer.domElement.removeEventListener("mousedown", b, !1),
                            a.renderer.domElement.removeEventListener("touchstart", b, !1),
                            a.renderer.domElement.removeEventListener("mouseup", P, !1),
                            a.renderer.domElement.removeEventListener("touchend", P, !1),
                            a.canvas.remove(),
                            l.domElement.parentNode.removeChild(l.domElement),
                            l = null,
                            a.renderCallback = null,
                            a.renderCallback = null,
                            a.orbitControl.dispose(),
                            a.orbitControl = null,
                            a.renderer.dispose(),
                            a.cancelRAF()
                    }
                    ,
                    a.renderCallback = function () {
                        TWEEN.getAll().length > 0 && (a.renderRequestPending = !0),
                            TWEEN.update(),
                            l.render(c, a.camera)
                    }
                ;
                var m = function (e) {
                    var t = 0;
                    if (null != e.wheelDelta ? t = e.wheelDelta : null != e.detail && (t = -e.detail),
                        t) {
                        var n = a.previewObject.contentProvider.zoomScale;
                        (t > 0 && 1 == n || t < 0 && n > 1) && e.preventDefault(),
                            a.previewObject.zoom(t > 0 ? 1 : -1)
                    }
                    o()
                }
                    , v = function (e) {
                    if (a.renderRequestPending = !0,
                        e = S(e),
                    a.isMouseDown && 0 != e.movementX && 0 != e.movementY && (a.isMouseMoving = !0),
                    null != e.touches && 2 == e.touches.length && null != a.startTouches) {
                        a.zoomDirty = !0;
                        var t = s.getVectorAvg(s.getTouches(e, a.container.offset()))
                            , n = s.calculateScale(a.startTouches, s.getTouches(e));
                        a.lastScale,
                            a.previewObject.contentProvider.zoomScale,
                            t.x,
                            t.y;
                        return a.camera.position.z = a.originalZ / n,
                            a.lastScale = n,
                            a.lastZoomCenter = t,
                            void e.preventDefault()
                    }
                    if (1 == a.isMouseDown && 1 == a.previewObject.contentProvider.zoomScale) {
                        var i = e.pageX - a.lastPos;
                        performance.now(),
                            a.lastTime;
                        Math.abs(i) > a.swipe_threshold && (i < 0 ? a.target.next() : a.target.prev(),
                            e.preventDefault(),
                            a.isMouseDown = !1),
                            a.lastPos = e.pageX,
                            a.lastTime = performance.now()
                    }
                }
                    , b = function (e) {
                    null != (e = S(e)).touches && 2 == e.touches.length && null == a.startTouches && (a.startTouches = s.getTouches(e),
                        a.lastScale = 1,
                        a.originalZ = 1 * a.camera.position.z),
                        document.activeElement.blur(),
                        a.mouseValue = e.pageX + "," + e.pageY,
                        a.isMouseMoving = !1,
                        a.isMouseDown = !0,
                        a.lastPos = e.pageX,
                        a.lastTime = performance.now()
                }
                    , w = function (e) {
                    if (a.isMouseDown = !1,
                    0 !== e.button)
                        return this;
                    var n = e.pageX + "," + e.pageY;
                    if (a.isMouseMoving)
                        ;
                    else if (n == a.mouseValue) {
                        e = e || window.event,
                            e = t.event.fix(e);
                        var i = a.mouse
                            , o = a.raycaster;
                        i.x = e.offsetX / a.canvas.innerWidth() * 2 - 1,
                            i.y = 1 - e.offsetY / a.canvas.innerHeight() * 2,
                            o.setFromCamera(i, a.camera);
                        var r = o.intersectObjects(a.target instanceof MOCKUP.Bundle ? a.target.children : [a.target], !0);
                        if (r.length > 0) {
                            var s, l = 0;
                            do {
                                s = null != r[l] ? r[l].object : null,
                                    l++
                            } while ((s instanceof THREE.BoxHelper || !(s instanceof MOCKUP.Paper) || 1 == s.isFlipping) && l < r.length);
                            null != s.userData.object || (s.angles[1] > 90 ? 1 != s.isEdge && a.target.next() : 1 != s.isEdge && a.target.prev())
                        }
                    }
                }
                    , P = function (e) {
                    if (null != (e = S(e)).touches && 0 == e.touches.length) {
                        a.previewObject.contentProvider.zoomScale;
                        1 == a.zoomDirty && (a.previewObject.contentProvider.zoomScale = s.limitAt(a.previewObject.contentProvider.zoomScale * a.lastScale, 1, a.previewObject.contentProvider.maxZoom),
                            a.previewObject.zoomValue = 1 * a.previewObject.contentProvider.zoomScale,
                            a.previewObject.resize(),
                            a.zoomDirty = !1),
                            a.lastScale = null,
                            a.startTouches = null
                    }
                    null != e.touches && e.touches.length > 1 || w(e)
                };
                return a.renderer.domElement.addEventListener("mousemove", v, !1),
                    a.renderer.domElement.addEventListener("touchmove", v, !1),
                    a.renderer.domElement.addEventListener("mousedown", b, !1),
                    a.renderer.domElement.addEventListener("touchstart", b, !1),
                    a.renderer.domElement.addEventListener("mouseup", P, !1),
                    a.renderer.domElement.addEventListener("touchend", P, !1),
                1 == a.options.scrollWheel && (a.renderer.domElement.addEventListener("mousewheel", m, !1),
                    a.renderer.domElement.addEventListener("DOMMouseScroll", m, !1)),
                    t(a.renderer.domElement).css({
                        display: "block"
                    }),
                    t(window).trigger("resize"),
                    this
            }

            return D(n, e),
                n.prototype.width = function () {
                    return this.container.width()
                }
                ,
                n.prototype.height = function () {
                    return this.container.height()
                }
                ,
                n
        }(MOCKUP.Stage),
            MOCKUP.PreviewStage = A;
        var n = function (t) {
            function n(e, n) {
                (e = e || {}).folds = 1,
                    t.call(this, e, n),
                    this.angle = 0,
                    this.isFlipping = !1,
                    this.material.materials[5].transparent = !0,
                    this.material.materials[4].transparent = !0,
                    this.type = "stage"
            }

            return D(n, t),
                n.prototype.tween = function (t, n) {
                    var i = this;
                    i.originalStiff = i.stiffness;
                    var o = i.newStiffness
                        , a = I(i.parent)
                        , r = n - t
                        , s = t > 90
                        , l = i.parent.direction == e.DIRECTION.RTL;
                    i.init = {
                        angle: t,
                        angle2: t < 90 ? 0 : 180,
                        stiff: i.originalStiff,
                        index: s && !l || !s && l ? 1 : 0
                    },
                        i.first = {
                            angle: t + r / 4,
                            angle2: 90,
                            stiff: i.originalStiff,
                            index: s && !l || !s && l ? 1 : .25
                        },
                        i.mid = {
                            angle: t + 2 * r / 4,
                            angle2: t < 90 ? 135 : 45,
                            stiff: i.newStiffness,
                            index: .5
                        },
                        i.mid2 = {
                            angle: t + 3 * r / 4,
                            angle2: t < 90 ? 180 : 0,
                            stiff: i.newStiffness,
                            index: s && !l || !s && l ? .25 : 1
                        },
                        i.end = {
                            angle: n,
                            angle2: t < 90 ? 180 : 0,
                            stiff: i.newStiffness,
                            index: s && !l || !s && l ? 0 : 1
                        },
                        i.isFlipping = !0;
                    var c = function (e, t) {
                        i.angles[1] = e.angle,
                            i.angles[4] = i.isHard ? e.angle : e.angle2,
                            1 == i.isHard ? i.stiffness = 0 : (i.stiffness = e.stiff / (o + 1e-5) * (i.newStiffness + 1e-5),
                                i.stiffness = isNaN(i.stiffness) ? 0 : e.stiff),
                        a && (i.material.materials[5].opacity = i.material.materials[4].opacity = e.index,
                            i.castShadow = e.index > .5),
                            i.updateAngle(!0)
                    };
                    a && (!s && !l || s && l) && (i.material.materials[5].opacity = i.material.materials[4].opacity = 0,
                        i.castShadow = !1),
                        i.currentTween = new TWEEN.Tween(i.init).to({
                            angle: [i.first.angle, i.mid.angle, i.mid2.angle, i.end.angle],
                            angle2: [i.first.angle2, i.mid.angle2, i.mid2.angle2, i.end.angle2],
                            stiff: [i.first.stiff, i.mid.stiff, i.mid2.stiff, i.end.stiff],
                            index: [i.first.index, i.mid.index, i.mid2.index, i.end.index]
                        }, i.parent.duration).onUpdate(function (e) {
                            c(this)
                        }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(function (e) {
                            i.stiffness = i.newStiffness,
                                i.updateAngle(),
                                i.material.materials[5].opacity = i.material.materials[4].opacity = 1,
                                i.castShadow = !0,
                                i.isFlipping = !1,
                            i.parent && i.parent.refresh && i.parent.refresh()
                        }).start()
                }
                ,
                n
        }(MOCKUP.FlexBoxPaper);
        MOCKUP.BookPaper = n;
        var o = function (t) {
            function n(n, i) {
                (n = n || {}).segments = n.segments || 50,
                    this.pageCount = n.pageCount,
                    this.height = n.height,
                    this.width = n.width,
                    this.pageCount = 1 == this.pageCount ? this.pageCount : 2 * Math.ceil(this.pageCount / 2),
                    this.direction = n.direction || e.DIRECTION.LTR,
                    this.startPage = 1,
                    this.endPage = this.pageCount,
                    this.stackCount = n.stackCount || 6,
                    this.materials = [],
                    t.call(this, n, i),
                    this.angles = [0, 0, 0, 0, 0, 0],
                    this.stiffness = null == n.stiffness ? 1.5 : n.stiffness,
                    this.hardConfig = n.hard,
                    this._activePage = n.openPage || this.startPage,
                    this.createStack(n),
                    this.pageMode = n.pageMode || (T || this.pageCount <= 2 ? e.PAGE_MODE.SINGLE : e.PAGE_MODE.DOUBLE),
                    this.singlePageMode = n.singlePageMode || (T ? e.SINGLE_PAGE_MODE.BOOKLET : e.SINGLE_PAGE_MODE.ZOOM),
                    this.type = "Book"
            }

            return D(n, t),
                n.prototype.getPageByNumber = function (e) {
                    var t = I(this) ? R(this) ? e + 1 : e : Math.floor((e - 1) / 2);
                    return this.getObjectByName(t.toString())
                }
                ,
                n.prototype.isPageHard = function (e) {
                    return s.isHardPage(this.hardConfig, e, this.pageCount)
                }
                ,
                n.prototype.activePage = function (e) {
                    if (null == e)
                        return this._activePage;
                    this.gotoPage(e)
                }
                ,
                n.prototype.gotoPage = function (e) {
                    e = parseInt(e, 10),
                        this._activePage = e,
                    1 == this.autoPlay && this.previewObject.setAutoPlay(this.autoPlay),
                        this.updatePage(e)
                }
                ,
                n.prototype.moveBy = function (e) {
                    var t = this._activePage + e;
                    t = b(t, this.startPage, this.endPage),
                        this.gotoPage(t)
                }
                ,
                n.prototype.next = function (t) {
                    null == t && (t = this.direction == e.DIRECTION.RTL ? -this.pageMode : this.pageMode),
                        this.moveBy(t)
                }
                ,
                n.prototype.prev = function (t) {
                    null == t && (t = this.direction == e.DIRECTION.RTL ? this.pageMode : -this.pageMode),
                        this.moveBy(t)
                }
                ,
                n.prototype.updateAngle = function () {
                    for (var e = this.angles[1], t = this.angles[4] - e, n = this.stackCount, i = 0; i < n; i++) {
                        var o = this.children[i];
                        o.angles[1] = e + i * t / (100 * n),
                            o.stiffness = this.stiffness,
                            o.updateAngle()
                    }
                }
                ,
                n.prototype.refresh = function () {
                    this.updatePage(this._activePage),
                    null != this.flipCallback && this.flipCallback()
                }
                ,
                n.prototype.updatePage = function (t) {
                    var n = this.direction == e.DIRECTION.RTL
                        , o = I(this)
                        , a = (E(t),
                        o ? 1 : 2);
                    t = Math.floor(t / a),
                    n && (t = this.pageCount / a - t);
                    var r = this.oldBaseNumber || 0
                        , s = this.pageCount / a
                        , l = this.stackCount
                        , c = o ? 0 : (.5 - Math.abs(s / 2 - t) / s) / this.stiffness
                        , d = Math.floor(l / 2)
                        , u = !1;
                    r > t ? (u = !0,
                        this.children[l - 1].skipFlip = !0,
                        this.children.unshift(this.children.pop())) : r < t && (this.children[0].skipFlip = !0,
                        this.children.push(this.children.shift()));
                    for (var h = 5 / s, p = h * t / 2, g = h * (s - t) / 2, f = p < g ? g : p, m = 0; m < l; m++) {
                        var v, b = this.children[m], w = (b.color,
                            b.angles[1]), P = t - d + m;
                        n && (P = o ? this.pageCount - P : Math.floor(this.pageCount / 2) - P - 1);
                        var y = b.isHard = this.isPageHard(P)
                            , O = b.name;
                        b.isEdge = !1,
                            0 == m ? b.depth = p < .4 ? .4 : p : m == l - 1 ? b.depth = g < .4 ? .4 : g : (b.depth = .4,
                                b.isEdge = !1),
                        1 == b.isFlipping && (b.depth = .4),
                            b.position.x = 0;
                        var C = .02 * m
                            , x = 180 - .02 * (m - d) + .02 * m;
                        if (m < d ? (b.newStiffness = y || 0 == this.stiffness ? 0 : c / (t / s) / 4,
                            v = C,
                            b.position.z = f - .4 * (-m + d),
                        1 == u && (b.position.z -= .4)) : (v = x,
                            b.newStiffness = y || 0 == this.stiffness ? 0 : c / (Math.abs(s - t) / s) / 4,
                            b.position.z = f - .4 * (-l + m + d + 1) - b.depth),
                        0 == b.isFlipping)
                            if (Math.abs(w - v) > 20 && 0 == b.skipFlip) {
                                b.depth = .4;
                                var L = b.stiffness;
                                L = w > v ? c / (Math.abs(s - t) / s) / 4 : c / (t / s) / 4,
                                    b.position.z += .4,
                                    b.stiffness = isNaN(L) ? b.stiffness : L,
                                    b.updateAngle(!0),
                                    b.targetStiffness = y ? 0 : m < t ? c / (Math.abs(s - t) / s) / 4 : c / (t / s) / 4,
                                    b.targetStiffness = y ? 0 : isNaN(b.targetStiffness) ? b.stiffness : b.targetStiffness,
                                    b.isFlipping = !0,
                                    b.tween(w, v),
                                null != this.preFlipCallback && this.preFlipCallback()
                            } else
                                b.skipFlip = !1,
                                    b.newStiffness = isNaN(b.newStiffness) ? 0 : b.newStiffness,
                                b.angles[1] == v && b.stiffness == b.newStiffness && b.depth == b.oldDepth || (b.angles[1] = b.angles[4] = v,
                                    b.stiffness = b.newStiffness,
                                    b.updateAngle(!0));
                        b.visible = o ? n ? m < d || b.isFlipping : m >= d || b.isFlipping : P >= 0 && P < s || o && P == s,
                            b.name = P.toString(),
                        null != this.requestPage && 1 == b.visible && b.name != O && (b.textureLoaded = !1,
                            b.frontImage(i.textureLoadFallback),
                            b.frontPageStamp = "-1",
                            b.frontTextureLoaded = !1,
                            b.thumbLoaded = !1,
                            b.backImage(i.textureLoadFallback),
                            b.backPageStamp = "-1",
                            b.backTextureLoaded = !1,
                            this.requestPage()),
                            b.oldDepth = b.depth;
                        var S = Math.abs(b.geometry.boundingBox.max.x) < Math.abs(b.geometry.boundingBox.min.x) ? b.geometry.boundingBox.max.x : b.geometry.boundingBox.min.x;
                        b.position.x = 1 == b.isEdge && 0 == b.isFlipping ? m < d ? S : -S : 0
                    }
                    this.oldBaseNumber = t,
                    null != this.updatePageCallback && this.updatePageCallback()
                }
                ,
                n.prototype.createCover = function (e) {
                    e.width = 2 * e.width,
                        this.cover = new MOCKUP.BiFold(e),
                        this.add(this.cover)
                }
                ,
                n.prototype.createStack = function (e) {
                    for (var t = "red,green,blue,yellow,orange,black".split(","), n = 0; n < this.stackCount; n++) {
                        e.angles = [, this.stackCount - n],
                            e.stiffness = (this.stackCount - n) / 100;
                        var i = new MOCKUP.BookPaper(e);
                        i.angles[1] = 180,
                            i.index = n,
                            i.updateAngle(),
                            i.textureReady = !1,
                            i.textureRequested = !1,
                            this.add(i),
                            i.color = t[n],
                            i.position.z = -1 * n
                    }
                }
                ,
                n.prototype.shininess = function (e) {
                    if (null == e)
                        return this.mainObject.shininess();
                    this.mainObject.shininess(e)
                }
                ,
                n.prototype.bumpScale = function (e) {
                    if (null == e)
                        return this.mainObject.bumpScale();
                    this.mainObject.bumpScale(e)
                }
                ,
                n.prototype.frontImage = function (e) {
                    if (null == e)
                        return this.mainObject.frontImage();
                    this.mainObject.frontImage(e)
                }
                ,
                n.prototype.backImage = function (e) {
                    if (null == e)
                        return this.mainObject.backImage();
                    this.mainObject.backImage(e)
                }
                ,
                n
        }(MOCKUP.Bundle);
        MOCKUP.Book = o
    }

    e.version = "brasilbook.ultra",
        e.PAGE_MODE = {
            SINGLE: 1,
            DOUBLE: 2,
            AUTO: null
        },
        e.SINGLE_PAGE_MODE = {
            ZOOM: 1,
            BOOKLET: 2,
            AUTO: null
        },
        e.CONTROLSPOSITION = {
            HIDDEN: "hide",
            TOP: "top",
            BOTTOM: "bottom"
        },
        e.DIRECTION = {
            LTR: 1,
            RTL: 2
        },
        e.CORNERS = {
            TL: "tl",
            TR: "tr",
            BL: "bl",
            BR: "br",
            L: "l",
            R: "r",
            NONE: null
        },
        e.SOURCE_TYPE = {
            IMAGE: "image",
            PDF: "pdf",
            HTML: "html"
        },
        e.DISPLAY_TYPE = {
            WEBGL: "3D",
            HTML: "2D"
        },
        e.PAGE_SIZE = {
            AUTO: 0,
            SINGLE: 1,
            DOUBLEINTERNAL: 2
        };
    var i = e.defaults = {
        webgl: true,
        webglShadow: true,
        soundEnable: true,
        height: "100%",
        autoEnableOutline: false,
        autoEnableThumbnail: false,
        overwritePDFOutline: !1,
        enableDownload: true,
        duration: 800,
        direction: e.DIRECTION.LTR,
        pageMode: e.PAGE_MODE.AUTO,
        singlePageMode: e.SINGLE_PAGE_MODE.AUTO,
        backgroundColor: "#fff",
        forceFit: !0,
        transparent: !1,
        hard: "none",
        annotationClass: "",
        autoPlay: !1,
        autoPlayDuration: 5e3,
        autoPlayStart: !1,
        maxTextureSize: 2400,
        minTextureSize: 256,
        rangeChunkSize: 524288,
        icons: {
            altnext: "ti-angle-right",
            altprev: "ti-angle-left",
            next: "ti-angle-right",
            prev: "ti-angle-left",
            end: "ti-angle-double-right",
            start: "ti-angle-double-left",
            share: "ti-sharethis-alt",
            help: "ti-help-alt",
            more: "ti-more-alt",
            download: "ti-download",
            zoomin: "ti-zoom-in",
            zoomout: "ti-zoom-out",
            fullscreen: "ti-fullscreen",
            fitscreen: "ti-arrows-corner",
            thumbnail: "ti-layout-grid2",
            outline: "ti-menu-alt",
            close: "ti-close",
            doublepage: "ti-book",
            singlepage: "ti-file",
            sound: "ti-volume",
            facebook: "ti-facebook",
            google: "ti-google",
            twitter: "ti-twitter-alt",
            mail: "ti-email",
            play: "ti-control-play",
            pause: "ti-control-pause"
        },
        text: {
            toggleSound: "Ligar/Desligar Som",
            toggleThumbnails: "Toggle Thumbnails",
            toggleOutline: "Toggle Outline/Bookmark",
            previousPage: "Página Anterior",
            nextPage: "Próxima Página",
            toggleFullscreen: "Tela cheia",
            zoomIn: "Ampliar",
            zoomOut: "Reduzir",
            toggleHelp: "Toggle Help",

            singlePageMode: "Modo uma página",
            doublePageMode: "Modo Livro",
            downloadPDFFile: "Baixar PDF",
            gotoFirstPage: "Ir para o ínicio",
            gotoLastPage: "Ir para o fim",

            share: "Compartilhar"
        },
        allControls: "thumbnail,zoomIn,startPage,altPrev,pageNumber,altNext,endPage,play,zoomOut,download,fullscreen",
        moreControls: "",
        hideControls: "",
        downloadName: "",
        controlsPosition: e.CONTROLSPOSITION.BOTTOM,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 30,
        scrollWheel: !0,
        onCreate: function (e) {
        },
        onCreateUI: function (e) {
        },
        onFlip: function (e) {
        },
        beforeFlip: function (e) {
        },
        onReady: function (e) {
        },
        zoomRatio: 1.5,
        pageSize: e.PAGE_SIZE.AUTO,
        pdfjsSrc: "/assets/js/pdf.js",
        pdfjsCompatibilitySrc: "/assets/js/compatibility.js",
        pdfjsWorkerSrc: "/assets/js/pdf.worker.js",
        threejsSrc: "/assets/js/THREE.js",
        mockupjsSrc: "/assets/js/mockup.js",
        soundFile: "",
        imagesLocation: "images",
        imageResourcesPath: "images/pdfjs/",
        cMapUrl: "",
        enableDebugLog: true,
        canvasToBlob: !1,
        enableAnnotation: !0,
        pdfRenderQuality: 10,
        textureLoadFallback: "blank",
        stiffness: 3,
        backgroundImage: false,
        pageRatio: null,
        pixelRatio: 1.6,
        thumbElement: "div",
        spotLightIntensity: .22,
        ambientLightColor: "#fff",
        ambientLightIntensity: 0.97,
        shadowOpacity: .15
    }
        , o = "WebKitCSSMatrix" in window || document.body && "MozPerspective" in document.body.style
        , a = "onmousedown" in window
        , r = (window,
        navigator.userAgent)
        , s = e.utils = {
        drag: {
            left: 0,
            right: 1,
            none: -1
        },
        mouseEvents: a ? {
            type: "mouse",
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
        } : {
            type: "touch",
            start: "touchstart",
            move: "touchmove",
            end: "touchend"
        },
        html: {
            div: "<div/>",
            img: "<img/>",
            a: "<a>",
            input: "<input type='text'/>"
        },
        toRad: function (e) {
            return e * Math.PI / 180
        },
        isset: function (e, t) {
            return null == e ? t : e
        },
        isnull: function (e) {
            return null == e || null == e
        },
        toDeg: function (e) {
            return 180 * e / Math.PI
        },
        transition: function (e, t) {
            return e ? t / 1e3 + "s ease-out" : "0s none"
        },
        display: function (e) {
            return e ? "block" : "none"
        },
        resetTranslate: function () {
            return f(0, 0)
        },
        translateStr: function (e, t) {
            return o ? " translate3d(" + e + "px," + t + "px, 0px) " : " translate(" + e + "px, " + t + "px) "
        },
        resetBoxShadow: function () {
            return "rgba(0, 0, 0, 0) 0px 0px 20px"
        },
        rotateStr: function (e) {
            return " rotateZ(" + e + "deg) "
        },
        bg: function (e) {
            return "#fff" + v(e)
        },
        bgImage: function (e) {
            return null == e || "blank" == e ? "" : " url(" + e + ")"
        },
        src: function (e) {
            return null != e ? "" + e : ""
        },
        limitAt: function (e, t, n) {
            return e < t ? t : e > n ? n : e
        },
        distOrigin: function (e, t) {
            return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))
        },
        distPoints: function (e, t, n, i) {
            return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2))
        },
        calculateScale: function (e, t) {
            var n = P(e[0].x, e[0].y, e[1].x, e[1].y);
            return P(t[0].x, t[0].y, t[1].x, t[1].y) / n
        },
        getVectorAvg: function (e) {
            return {
                x: e.map(function (e) {
                    return e.x
                }).reduce(s.sum) / e.length,
                y: e.map(function (e) {
                    return e.y
                }).reduce(s.sum) / e.length
            }
        },
        sum: function (e, t) {
            return e + t
        },
        getTouches: function (e, t) {
            return t = t || {
                left: 0,
                top: 0
            },
                Array.prototype.slice.call(e.touches).map(function (e) {
                    return {
                        x: e.pageX - t.left,
                        y: e.pageY - t.top
                    }
                })
        },
        angleByDistance: function (e, t) {
            var n = t / 2
                , i = b(e, 0, t);
            return i < n ? g(Math.asin(i / n)) : 90 + g(Math.asin((i - n) / n))
        },
        log: function (e) {
            1 == i.enableDebugLog && window.console && console.log(e)
        },
        lowerPowerOfTwo: function (e) {
            return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
        },
        nearestPowerOfTwo: function (e, t) {
            return Math.min(t || 2048, Math.pow(2, Math.ceil(Math.log(e) / Math.LN2)))
        },
        zoomStops: function (e, t, n, i, o) {
            null == i && (i = 256),
            null == o && (o = 2048);
            var a = Math.log(e / i) / Math.log(t);
            return i * Math.pow(t, null == n ? Math.round(a) : 1 == n ? Math.ceil(a) : Math.floor(a))
        },
        extendOptions: function (e, n) {
            return t.extend(!0, {}, e, n)
        },
        getFullscreenElement: function () {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        },
        hasFullscreenEnabled: function () {
            return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled
        },
        getBasePage: function (e) {
            return 2 * Math.floor(e / 2)
        },
        loadResources: function (e, t, n) {
            var i = document
                , o = i.createElement(e)
                , a = i.getElementsByTagName(e)[0];
            o.async = !0,
            n && o.addEventListener("load", function (e) {
                n(null, e)
            }, !1),
                o.src = t,
                a.parentNode.insertBefore(o, a)
        },
        getScript: function (e, t, n) {
            function i(e, i) {
                null != o && (i || !o.readyState || /loaded|complete/.test(o.readyState)) && (o.onload = o.onreadystatechange = null,
                    o = null,
                    o = null,
                i || (t && t(),
                    t = null,
                    n = null))
            }

            var o = document.createElement("script")
                , a = document.body.getElementsByTagName("script")[0];
            o.async = 1,
                o.setAttribute("data-cfasync", !1),
                null != a ? (a.parentNode.insertBefore(o, a),
                    a = null) : document.body.appendChild(o),
                o.addEventListener("load", i, !1),
                o.addEventListener("readystatechange", i, !1),
                o.addEventListener("complete", i, !1),
            n && o.addEventListener("error", n, !1),
                o.src = e + ("MS" == k.dom ? "?" + Math.random(1) : "")
        },
        isHardPage: function (e, t, n, i) {
            if (null != e) {
                if ("cover" == e)
                    return 0 == t || i && 1 == t || t == Math.floor(n / (i ? 1 : 2)) - (i ? 0 : 1);
                if ("all" == e)
                    return !0;
                var o = ("," + e + ",").indexOf("," + (2 * t + 1) + ",") > -1
                    , a = ("," + e + ",").indexOf("," + (2 * t + 2) + ",") > -1;
                return o || a
            }
            return !1
        },
        fixMouseEvent: function (e) {
            if (e) {
                var n = e.originalEvent || e;
                if (n.changedTouches && n.changedTouches.length > 0) {
                    var i = t.event.fix(e)
                        , o = n.changedTouches[0];
                    return i.clientX = o.clientX,
                        i.clientY = o.clientY,
                        i.pageX = o.pageX,
                        i.touches = n.touches,
                        i.pageY = o.pageY,
                        i.movementX = o.movementX,
                        i.movementY = o.movementY,
                        i
                }
                return e
            }
            return e
        },
        hasWebgl: function () {
            try {
                var e = document.createElement("canvas");
                return !(!window.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
            } catch (e) {
                return !1
            }
        }(),
        isBookletMode: function (t) {
            return t.pageMode == e.PAGE_MODE.SINGLE && t.singlePageMode == e.SINGLE_PAGE_MODE.BOOKLET
        },
        isRTLMode: function (t) {
            return t.direction == e.DIRECTION.RTL
        },
        isMobile: function () {
            var e = !1;
            return function (t) {
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
            }(r || navigator.vendor || window.opera),
                e
        }(),
        isIOS: /(iPad|iPhone|iPod)/g.test(r),
        isSafari: /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString(),
        prefix: function () {
            var e = window.getComputedStyle(document.documentElement, "")
                , t = Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/)[1];
            return {
                dom: "WebKit|Moz|MS".match(new RegExp("(" + t + ")", "i"))[1],
                lowercase: t,
                css: "-" + t + "-",
                js: t[0].toUpperCase() + t.substr(1)
            }
        }(),
        __extends: function (e, t) {
            function n() {
                this.constructor = e
            }

            for (var i in t)
                t.hasOwnProperty(i) && (e[i] = t[i]);
            return n.prototype = t.prototype,
                e.prototype = new n,
                e.__super = t.prototype,
                e
        }
    }
        , l = e.SOURCE_TYPE
        , c = (e.DISPLAY_TYPE,
        s.drag)
        , d = s.mouseEvents
        , u = s.html
        , h = s.isset
        , p = (s.isnull,
        s.toRad)
        , g = s.toDeg
        , f = (s.transition,
        s.translateStr)
        , m = (s.resetBoxShadow,
        s.rotateStr)
        , v = (s.bg,
        s.bgImage)
        , b = (s.src,
        s.limitAt)
        , w = s.distOrigin
        , P = s.distPoints
        , y = s.angleByDistance
        , O = s.log
        , C = s.nearestPowerOfTwo
        , x = s.extendOptions
        , E = s.getBasePage
        , L = s.getScript
        , S = s.fixMouseEvent
        , k = s.prefix
        , I = s.isBookletMode
        , R = s.isRTLMode
        , T = s.isMobile
        , M = s.hasWebgl
        , F = s.isSafari
        , B = s.isIOS
        , D = s.__extends;
    !function () {
        if (window.CanvasPixelArray)
            "function" != typeof window.CanvasPixelArray.prototype.set && (window.CanvasPixelArray.prototype.set = function (e) {
                    for (var t = 0, n = this.length; t < n; t++)
                        this[t] = e[t]
                }
            );
        else {
            var e, t = !1;
            if (F && (t = (e = r.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//)) && parseInt(e[1]) < 6),
                t) {
                var n = window.CanvasRenderingContext2D.prototype
                    , i = n.createImageData;
                n.createImageData = function (e, t) {
                    var n = i.call(this, e, t);
                    return n.data.set = function (e) {
                        for (var t = 0, n = this.length; t < n; t++)
                            this[t] = e[t]
                    }
                        ,
                        n
                }
                    ,
                    n = null
            }
        }
    }(),
        function () {
            "requestAnimationFrame" in window || (window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (e) {
                    window.setTimeout(e, 20)
                }
            )
        }(),
        function () {
            function e(e, t) {
                return new n(this.slice(e, t))
            }

            function t(e, t) {
                arguments.length < 2 && (t = 0);
                for (var n = 0, i = e.length; n < i; ++n,
                    ++t)
                    this[t] = 255 & e[n]
            }

            function n(n) {
                var i, o, a;
                if ("number" == typeof n)
                    for (i = [],
                             o = 0; o < n; ++o)
                        i[o] = 0;
                else if ("slice" in n)
                    i = n.slice(0);
                else
                    for (i = [],
                             o = 0,
                             a = n.length; o < a; ++o)
                        i[o] = n[o];
                return i.subarray = e,
                    i.buffer = i,
                    i.byteLength = i.length,
                    i.set = t,
                "object" == typeof n && n.buffer && (i.buffer = n.buffer),
                    i
            }

            if ("undefined" != typeof Uint8Array)
                return void 0 === Uint8Array.prototype.subarray && (Uint8Array.prototype.subarray = function (e, t) {
                        return new Uint8Array(this.slice(e, t))
                    }
                        ,
                        Float32Array.prototype.subarray = function (e, t) {
                            return new Float32Array(this.slice(e, t))
                        }
                ),
                    void ("undefined" == typeof Float64Array && (window.Float64Array = Float32Array));
            window.Uint8Array = n,
                window.Int8Array = n,
                window.Uint32Array = n,
                window.Int32Array = n,
                window.Uint16Array = n,
                window.Float32Array = n,
                window.Float64Array = n
        }();
    var z = function (e) {
        return t.extend(!0, {}, i, e)
    }
        , N = function (n, i) {
        function o(e) {
            y.removeClass("df-active")
        }

        function a(e) {
            switch (e.keyCode) {
                case X:
                    1 == r.isFullscreen && r.fullScreen.trigger("click");
                    break;
                case K:
                    W = !1;
                    break;
                case V:
                    H = !1;
                    break;
                case q:
                    G = !1;
                    break;
                case Y:
                    i.prev();
                    break;
                case Z:
                    i.next()
            }
        }

        var r = i.ui = t(u.div, {
            class: "df-ui"
        })
            , l = i.options;
        r.dispose = function () {
            n.find(".df-ui-btn").each(function () {
                t(this).off()
            }),
                w.off(),
                d.off(),
                h.off(),
                p.off(),
                g.off(),
                f.off(),
                m.off(),
                v.off(),
                P.off(),
                y.off(),
                E.off(),
                L.off(),
                k.off(),
                I.off(),
                R.off(),
                T.off(),
                M.off(),
                F.off(),
                B.off(),
                D.off(),
                S.remove(),
                b.remove(),
                h.remove(),
                d.remove(),
                g.remove(),
            r.shareBox && (r.shareBox.dispose && r.shareBox.dispose(),
                r.shareBox = null),
                document.removeEventListener("keyup", a, !1),
                window.removeEventListener("click", o, !1),
                r.update = null,
                i = null
        }
        ;
        var c = function (e) {
            return isNaN(e) ? e = i.target._activePage : e < 1 ? e = 1 : e > i.target.pageCount && (e = i.target.pageCount),
                e
        }
            , d = r.next = t(u.div, {
            class: "df-ui-btn df-ui-next arrows " + l.icons.next,
            title: l.text.nextPage,
            html: "<span>" + l.text.nextPage + "</span>"
        }).on("click", function () {
            i.next()
        })
            , h = r.prev = t(u.div, {
            class: "df-ui-btn df-ui-prev arrows " + l.icons.prev,
            title: l.text.previousPage,
            html: "<span>" + l.text.previousPage + "</span>"
        }).on("click", function () {
            i.prev()
        })
            , p = t(u.div, {
            class: "df-ui-btn df-ui-play " + l.icons.play,
            title: l.text.play,
            html: "<span>" + l.text.play + "</span>"
        }).on("click", function () {
            var e = t(this);
            i.setAutoPlay(!e.hasClass(l.icons.pause))
        });
        1 == l.autoPlay && (r.play = p,
            i.setAutoPlay(l.autoPlayStart));
        var g = t(u.div, {
            class: "df-ui-wrapper df-ui-zoom"
        })
            , f = r.zoomIn = t(u.div, {
            class: "df-ui-btn df-ui-zoomin " + l.icons.zoomin,
            title: l.text.zoomIn,
            html: "<span>" + l.text.zoomIn + "</span>"
        }).on("click", function () {
            i.zoom(1),
                r.update(),
            i.target.startPoint && i.target.pan && i.target.pan(i.target.startPoint)
        })
            , m = r.zoomOut = t(u.div, {
            class: "df-ui-btn df-ui-zoomout " + l.icons.zoomout,
            title: l.text.zoomOut,
            html: "<span>" + l.text.zoomOut + "</span>"
        }).on("click", function () {
            i.zoom(-1),
                r.update(),
            i.target.startPoint && i.target.pan && i.target.pan(i.target.startPoint)
        });
        g.append(f).append(m);
        var v = r.pageNumber = t(u.div, {
            class: "df-ui-btn df-ui-page"
        }).on("change", function () {
            var e = parseInt(r.pageInput.val(), 10);
            e = c(e),
                i.gotoPage(e)
        }).on("keyup", function (e) {
            if (13 == e.keyCode) {
                var t = parseInt(r.pageInput.val(), 10);
                (t = c(t)) !== c(i.target._activePage || i._activePage) && i.gotoPage(t)
            }
        });
        r.pageInput = t('<input id="df_book_page_number" type="text" style="display: none"/>').appendTo(v),
            r.pageLabel = t('<label for="df_book_page_number"/>').appendTo(v);
        var b = t(u.div, {
            class: "df-ui-wrapper df-ui-size"
        })
            , w = t(u.div, {
            class: "df-ui-btn df-ui-help " + l.icons.help,
            title: l.text.toggleHelp,
            html: "<span>" + l.text.toggleHelp + "</span>"
        }).on("click", function () {
        })
            , P = r.sound = t(u.div, {
            class: "df-ui-btn df-ui-sound " + l.icons.sound,
            title: l.text.toggleSound,
            html: "<span>" + l.text.toggleSound + "</span>"
        }).on("click", function () {
            l.soundEnable = !l.soundEnable,
                r.updateSound()
        });
        r.updateSound = function () {
            0 == l.soundEnable || "false" == l.soundEnable ? P.addClass("disabled") : P.removeClass("disabled")
        }
            ,
            r.updateSound();
        var y = r.more = t(u.div, {
            class: "df-ui-btn df-ui-more " + l.icons.more
        }).on("click", function (e) {
            y.hasClass("df-active") || (t(this).addClass("df-active"),
                e.stopPropagation())
        });
        window.addEventListener("click", o, !1);
        var C = t(u.div, {
            class: "more-container"
        });
        if (y.append(C),
        "string" == typeof l.source && 1 == l.enableDownload) {
            var x = "df-ui-btn df-ui-download " + l.icons.download;
            console.log(l, "--------------");
            (r.download = t('<a download="' + (l.downloadName ? l.downloadName : 'BrasilAlbum.pdf') + '" target="_blank" class="' + x + '"><span>' + l.text.downloadPDFFile + "</span></a>")).attr("href", l.source).attr("title", l.text.downloadPDFFile)
        }
        s.hasFullscreenEnabled() || n.addClass("df-custom-fullscreen"),
            r.switchFullscreen = function () {
                s.getFullscreenElement();
                var e = i.container[0];
                1 != r.isFullscreen ? (i.container.addClass("df-fullscreen"),
                    e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen(),
                    r.isFullscreen = !0) : (i.container.removeClass("df-fullscreen"),
                    r.isFullscreen = !1,
                    document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()),
                s.hasFullscreenEnabled() || setTimeout(function () {
                    i.resize()
                }, 50)
            }
        ;
        var E = r.fullScreen = t(u.div, {
            class: "df-ui-btn df-ui-fullscreen " + l.icons.fullscreen,
            title: l.text.toggleFullscreen,
            html: "<span>" + l.text.toggleFullscreen + "</span>"
        }).on("click", r.switchFullscreen)
            , L = r.fit = t(u.div, {
            class: "df-ui-btn df-ui-fit " + l.icons.fitscreen
        }).on("click", function () {
            t(this).toggleClass("df-button-fit-active")
        });
        b.append(E);
        var S = t(u.div, {
            class: "df-ui-wrapper df-ui-controls"
        })
            , k = (r.shareBox = new e.Share(n, l),
            r.share = t(u.div, {
                class: "df-ui-btn df-ui-share " + l.icons.share,
                title: l.text.share,
                html: "<span>" + l.text.share + "</span>"
            }).on("click", function (e) {
                1 == r.shareBox.isOpen ? r.shareBox.close() : (r.shareBox.update(i.getURLHash()),
                    r.shareBox.show())
            }))
            , I = r.startPage = t(u.div, {
            class: "df-ui-btn df-ui-start " + l.icons.start,
            title: l.text.gotoFirstPage,
            html: "<span>" + l.text.gotoFirstPage + "</span>"
        }).on("click", function () {
            i.start()
        })
            , R = r.endPage = t(u.div, {
            class: "df-ui-btn df-ui-end " + l.icons.end,
            title: l.text.gotoLastPage,
            html: "<span>" + l.text.gotoLastPage + "</span>"
        }).on("click", function () {
            i.end()
        })
            , T = r.pageMode = t(u.div, {
            class: "df-ui-btn df-ui-pagemode " + l.icons.singlepage,
            html: "<span>" + l.text.singlePageMode + "</span>"
        }).on("click", function () {
            var e = t(this);
            i.setPageMode(!e.hasClass(l.icons.doublepage))
        });
        i.setPageMode(i.target.pageMode == e.PAGE_MODE.SINGLE);
        for (var M = r.altPrev = t(u.div, {
            class: "df-ui-btn df-ui-prev df-ui-alt " + l.icons.prev,
            title: l.text.previousPage,
            html: "<span>" + l.text.previousPage + "</span>"
        }).on("click", function () {
            i.prev()
        }), F = r.altNext = t(u.div, {
            class: "df-ui-btn df-ui-next df-ui-alt " + l.icons.next,
            title: l.text.nextPage,
            html: "<span>" + l.text.nextPage + "</span>"
        }).on("click", function () {
            i.next()
        }), B = r.thumbnail = t(u.div, {
            class: "df-ui-btn df-ui-thumbnail " + l.icons.thumbnail,
            title: l.text.toggleThumbnails,
            html: "<span>" + l.text.toggleThumbnails + "</span>"
        }).on("click", function () {
            var e = t(this);
            i.target.thumbContainer ? (i.target.thumbContainer.toggleClass("df-sidemenu-visible"),
                e.toggleClass("df-active")) : (i.contentProvider.initThumbs(),
                e.toggleClass("df-active")),
            e.hasClass("df-active") && e.siblings(".df-active").trigger("click"),
                r.update(!0)
        }), D = r.outline = t(u.div, {
            class: "df-ui-btn df-ui-outline " + l.icons.outline,
            title: l.text.toggleOutline,
            html: "<span>" + l.text.toggleOutline + "</span>"
        }).on("click", function () {
            var e = t(this);
            if (i.target.outlineContainer) {
                var n = i.target.outlineContainer;
                e.toggleClass("df-active"),
                    n.toggleClass("df-sidemenu-visible"),
                e.hasClass("df-active") && e.siblings(".df-active").trigger("click"),
                    r.update(!0)
            }
        }), z = l.allControls.replace(/ /g, "").split(","), N = "," + l.moreControls.replace(/ /g, "") + ",", A = "," + l.hideControls.replace(/ /g, "") + ",", _ = (N.split(","),
            0); _ < z.length; _++) {
            var j = z[_];
            if (A.indexOf("," + j + ",") < 0) {
                var U = r[j];
                null != U && (N.indexOf("," + j + ",") > -1 && "more" !== j && "pageNumber" !== j ? C.append(U) : S.append(U))
            }
        }
        n.append(S).append(h).append(d).append(g);
        var H = !1
            , W = !1
            , G = !1
            , K = 16
            , V = 17
            , q = 18
            , Z = 39
            , Y = 37
            , X = 27;
        document.addEventListener("keyup", a, !1),
            r.update = function (t) {
                O("ui update");
                var o = i.target
                    , a = c(o._activePage || i._activePage)
                    , s = o.pageCount || i.pageCount
                    , l = o.direction == e.DIRECTION.RTL
                    , d = 1 == a || 0 == a
                    , u = a == s;
                r.next.show(),
                    r.prev.show(),
                    r.altNext.removeClass("disabled"),
                    r.altPrev.removeClass("disabled"),
                (d && !l || u && l) && (r.prev.hide(),
                    r.altPrev.addClass("disabled")),
                (u && !l || d && l) && (r.next.hide(),
                    r.altNext.addClass("disabled")),
                    r.pageInput.val(a);

                r.pageLabel.html(a + '-' + (1 + parseInt(a)) + "/" + s);

                console.log(a, s);

                (a % 2 === 0 && a !== s)
                    ?
                    ((a === 1 || a === s)
                        ? r.pageLabel.html(a + " / " + s)
                        : r.pageLabel.html((a) + '-' + (a + 1) + " / " + s))
                    :
                    ((a === 1 || a === s)
                        ? r.pageLabel.html(a + " / " + s)
                        : r.pageLabel.html((a - 1) + '-' + a + " / " + s));


                n.find(".df-sidemenu-visible").length > 0 ? n.addClass("df-sidemenu-open") : n.removeClass("df-sidemenu-open"),
                1 == t && i.resize(),
                    o.contentProvider.zoomScale == o.contentProvider.maxZoom ? r.zoomIn.addClass("disabled") : r.zoomIn.removeClass("disabled"),
                    1 == o.contentProvider.zoomScale ? r.zoomOut.addClass("disabled") : r.zoomOut.removeClass("disabled")
            }
            ,
        null != i.target && (i.target.ui = r),
        null != l.onCreateUI && l.onCreateUI(i)
    }
        , A = null
        , _ = function (n) {
        function i(t) {
            function n() {
                setTimeout(function () {
                    i.resize()
                }, 50)
            }

            t = t || {},
                this.type = "PreviewObject";
            var i = this;
            i.zoomValue = 1,
                window.addEventListener("resize", n, !1),
                this.sound = document.createElement("audio"),
                this.sound.setAttribute("src", t.soundFile + "?ver=" + e.version),
                this.sound.setAttribute("type", "audio/mpeg"),
                this.autoPlayFunction = function () {
                    i && i.target.autoPlay && (i.target.direction == e.DIRECTION.RTL ? i.target.prev() : i.target.next())
                }
                ,
                this.dispose = function () {
                    if (clearInterval(this.autoPlayTimer),
                        this.autoPlayTimer = null,
                        this.autoPlayFunction = null,
                    this.target && this.target.children)
                        for (var e = 0; e < this.target.children.length; e++) {
                            var t = this.target.children[e];
                            t && t.currentTween && t.currentTween.stop()
                        }
                    this.zoomTween && (this.zoomTween.stop && this.zoomTween.stop(),
                        this.zoomTween = null),
                    this.container && this.container.info && this.container.info.remove && this.container.info.remove(),
                    this.target && this.target.dispose && this.target.dispose(),
                        this.target = null,
                    this.stage && this.stage.dispose && this.stage.dispose(),
                        this.stage = null,
                    this.ui && this.ui.dispose && this.ui.dispose(),
                        this.ui = null,
                    this.contentProvider && this.contentProvider.dispose && this.contentProvider.dispose(),
                        this.contentProvider = null,
                        window.removeEventListener("resize", n)
                }
        }

        return i.prototype = {
            start: function () {
                this.target.gotoPage(this.target.startPage)
            },
            end: function () {
                this.target.gotoPage(this.target.endPage)
            },
            next: function () {
            },
            prev: function () {
            },
            zoom: function (e) {
                this.pendingZoom = !0,
                    this.zoomDelta = e,
                    this.resize(),
                    this.ui.update()
            },
            resize: function () {
                var n = this;
                if (null != n.target && null != n.target.ui && null != n.target.contentProvider && null != n.target.contentProvider.viewport && null != n.target.stage) {
                    this.ui && 1 == this.ui.isFullscreen && 1 == s.hasFullscreenEnabled() && null == s.getFullscreenElement() && this.ui.switchFullscreen();
                    var i, o, a, r, c, d, u = n.target, h = n.container, p = n.options, g = u.stage,
                        f = u.contentProvider, m = f.pageRatio, v = (f.zoomViewport,
                            R(u)), P = "css" !== u.mode, y = (f.pageRatio,
                            h.hasClass("df-sidemenu-open") ? 220 : 0), O = this.target.pageMode == e.PAGE_MODE.SINGLE;
                    h.height(p.height);
                    var C = Math.min(h.height(), t(window).height());
                    h.height(C);
                    var x = h.width();
                    x < 400 ? n.container.addClass("df-xs") : n.container.removeClass("df-xs");
                    var E = h.find(".df-ui-controls").height()
                        , L = p.paddingTop + (p.controlsPosition == e.CONTROLSPOSITION.TOP ? E : 0)
                        , S = p.paddingRight
                        , k = p.paddingBottom + (p.controlsPosition == e.CONTROLSPOSITION.BOTTOM ? E : 0)
                        , I = p.paddingLeft
                        , T = x - y
                        , M = C
                        , F = (L = isNaN(L) ? 0 : b(L, 0, L)) + (k = isNaN(k) ? 0 : b(k, 0, k))
                        , B = (I = isNaN(I) ? 0 : b(I, 0, I)) + (S = isNaN(I) ? 0 : b(I, 0, I))
                        , D = T - B
                        , z = M - F;
                    if (a = Math.floor(O ? D : D / 2),
                        o = Math.floor(a / m),
                    (i = o > z) && (a = (o = z) * m),
                        d = f.maxZoom = f.zoomViewport.height / o,
                    null == n.zoomValue && (n.zoomValue = 1),
                    null == f.zoomScale && (f.zoomScale = 1),
                    1 == n.pendingZoom && null != n.zoomDelta) {
                        n.zoomDelta;
                        var N, A = Math.max(o, a);
                        n.zoomValue = n.zoomDelta > 0 ? n.zoomValue * n.options.zoomRatio : n.zoomValue / n.options.zoomRatio,
                            n.zoomValue = b(n.zoomValue, 1, d),
                            1 == n.zoomValue ? f.zoomScale = 1 : (N = o * n.zoomValue,
                                N = s.zoomStops(N, n.options.zoomRatio, n.zoomDelta > 0, Math.max(a, o)),
                                f.zoomScale = b(N / A, 1, d))
                    }
                    c = f.zoomScale,
                        f.checkViewportSize(a, o, c),
                    f.contentSourceType == l.PDF && (a = f.imageViewport.width / c,
                        o = f.imageViewport.height / c),
                    1 != f.zoomScale && this.target.container.addClass("df-zoom-enabled");
                    var _ = u.zoomWidth = Math.floor(a * c)
                        , j = u.zoomHeight = Math.floor(o * c)
                        , U = 2 * _;
                    if (P) {
                        var H = j / u.height
                            , W = T / M
                            , G = c * (o + F) / H
                            , K = c * (a * (O ? 1 : 2) + B) / H
                            , V = i ? G : K / W;
                        g.resizeCanvas(T, M),
                            r = 1 / (2 * Math.tan(Math.PI * g.camera.fov * .5 / 180) / (V / c)) + 2.2,
                            g.camera.updateProjectionMatrix(),
                            g.renderRequestPending = !0;
                        var q = (L - k) * (u.height / o) / c / 2;
                        f.zoomScale;
                        g.camera.position.z !== r && 1 == n.pendingZoom ? (null != n.zoomTween && n.zoomTween.stop(),
                            n.zoomTween = new TWEEN.Tween({
                                campos: g.camera.position.z,
                                otx: g.orbitControl.target.x,
                                oty: g.orbitControl.target.y,
                                otz: g.orbitControl.target.z
                            }).delay(0).to({
                                campos: r,
                                otx: 0,
                                oty: q,
                                otz: 0
                            }, 100).onUpdate(function () {
                                g.camera.position.z = this.campos,
                                    g.camera.position.y = q,
                                    g.orbitControl.target = new THREE.Vector3(this.otx, this.oty, this.otz),
                                    g.orbitControl.update()
                            }).easing(TWEEN.Easing.Linear.None).onComplete(function () {
                                g.camera.position.set(0, q, r),
                                    g.orbitControl.target = new THREE.Vector3(0, q, 0),
                                    g.orbitControl.update()
                            }).start()) : (g.camera.position.set(0, q, r),
                            g.orbitControl.target = new THREE.Vector3(0, q, 0),
                            g.orbitControl.update()),
                            g.orbitControl.update(),
                            g.orbitControl.mouseButtons.ORBIT = 1 != c ? -1 : THREE.MOUSE.RIGHT,
                            g.orbitControl.mouseButtons.PAN = 1 != c ? THREE.MOUSE.LEFT : -1
                    } else {
                        u.pageWidth = Math.round(a),
                            u.fullWidth = 2 * u.pageWidth,
                            u.height = Math.round(o);
                        var Z = u.shiftHeight = Math.round(b((j - M + F) / 2, 0, j))
                            , Y = u.shiftWidth = Math.round(b((U - T + B) / 2, 0, U));
                        1 == c && (u.left = 0,
                            u.top = 0),
                            u.stage.css({
                                top: -Z,
                                bottom: -Z,
                                right: -Y + (v ? y : 0),
                                left: -Y + (v ? 0 : y),
                                paddingTop: L,
                                paddingRight: S,
                                paddingBottom: k,
                                paddingLeft: I,
                                transform: "translate3d(" + u.left + "px," + u.top + "px,0)"
                            }),
                            u.stageHeight = g.height(),
                            u.wrapper.css({
                                width: U,
                                height: j,
                                marginTop: C - j - F > 0 ? (C - F - j) / 2 : 0
                            });
                        var X = Math.floor(w(a, o) * c);
                        u.stage.find(".df-page-wrapper").width(X).height(X),
                            u.stage.find(".df-book-page, .df-page-front , .df-page-back, .df-page-fold-inner-shadow").height(j).width(_)
                    }
                    n.checkCenter({
                        type: "resize"
                    }),
                    1 == f.zoomScale && this.target.container.removeClass("df-zoom-enabled"),
                    u.thumblist && u.thumblist.reset(t(u.thumblist.container).height()),
                        n.pendingZoom = !1
                }
            },
            playSound: function () {
                try {
                    this.options && 1 == this.options.soundEnable && (this.sound.currentTime = 0,
                        this.sound.play())
                } catch (e) {
                }
            },
            setPageMode: function (t) {
                1 == t ? (this.ui.pageMode.addClass(this.options.icons.doublepage),
                    this.ui.pageMode.html("<span>" + this.options.text.doublePageMode + "</span>"),
                    this.ui.pageMode.attr("title", this.options.text.doublePageMode),
                    this.target.pageMode = e.PAGE_MODE.SINGLE) : (this.ui.pageMode.removeClass(this.options.icons.doublepage),
                    this.ui.pageMode.html("<span>" + this.options.text.singlePageMode + "</span>"),
                    this.ui.pageMode.attr("title", this.options.text.singlePageMode),
                    this.target.pageMode = e.PAGE_MODE.DOUBLE),
                this.target && this.target.singlePageMode == e.SINGLE_PAGE_MODE.BOOKLET && this.target.reset(),
                    this.resize()
            },
            setAutoPlay: function (e) {
                if (this.options.autoPlay) {
                    var t = (e = 1 == e) ? this.options.text.pause : this.options.text.play;
                    this.ui.play.toggleClass(this.options.icons.pause, e),
                        this.ui.play.html("<span>" + t + "</span>"),
                        this.ui.play.attr("title", t),
                        clearInterval(this.autoPlayTimer),
                    e && (this.autoPlayTimer = setInterval(this.autoPlayFunction, this.options.autoPlayDuration)),
                        this.target.autoPlay = e
                }
            },
            height: function (e) {
                if (null == e)
                    return this.container.height();
                this.options.height = e,
                    this.container.height(e),
                    this.resize()
            },
            checkCenter: function (t) {
                t = null == t ? {} : t,
                    this.centerType = this.centerType || "start";
                var n, i = this.target, o = 0, a = 0, r = 0, l = s.getBasePage(i._activePage),
                    c = i._activePage % 2 == 0, d = i.direction == e.DIRECTION.RTL,
                    u = i.pageMode == e.PAGE_MODE.SINGLE, h = u && i.singlePageMode == e.SINGLE_PAGE_MODE.BOOKLET,
                    p = i.stage.width();
                if ("css" == i.mode)
                    n = i.wrapper.width(),
                        o = Math.max((n - p) / 2, 0),
                        a = -n / 4,
                        r = n / 4,
                        0 == l || h ? (i.wrapper.css({
                            left: u ? d ? r - o : a - o : d ? r : a
                        }),
                            i.shadow.css({
                                width: "50%",
                                left: d ? 0 : "50%",
                                transitionDelay: ""
                            })) : l == i.pageCount ? (i.wrapper.css({
                            left: u ? d ? a - o : r - o : d ? a : r
                        }),
                            i.shadow.css({
                                width: "50%",
                                left: d ? "50%" : 0,
                                transitionDelay: ""
                            })) : (i.wrapper.css({
                            left: u ? d ? c ? a - o : r - o : c ? r - o : a - o : 0
                        }),
                            i.shadow.css({
                                width: "100%",
                                left: 0,
                                transitionDelay: parseInt(i.duration, 10) + 50 + "ms"
                            })),
                        i.wrapper.css({
                            transition: "resize" == t.type ? "none" : ""
                        });
                else if (null != i.stage) {
                    var g, f = i.position.x;
                    o = i.width / 4,
                        a = -(n = i.width) / 2,
                        r = n / 2,
                    (g = 0 == l || h ? d ? r : a : l == i.pageCount ? d ? a : r : u ? d ? c ? a : r : c ? r : a : 0) !== this.centerEnd && (this.centerTween = new TWEEN.Tween({
                        x: f
                    }).delay(0).to({
                        x: g
                    }, i.duration).onUpdate(function () {
                        i.position.x = this.x,
                            i.stage.cssScene.position.x = this.x
                    }).easing(i.ease).start(),
                        this.centerEnd = g)
                }
            },
            width: function (e) {
                if (null == e)
                    return this.container.width();
                this.options.width = e,
                    this.container.width(e),
                    this.resize()
            }
        },
            i
    }();
    e.PreviewObject = _;
    var j = function (n) {
        function o(n, o, a, r) {
            a = a || {};
            var s = this;
            if (s.contentRawSource = n || [i.textureLoadFallback],
                s.contentSource = s.contentRawSource,
                s.contentSourceType = null,
                s.minDimension = a.minTextureSize || 256,
                s.maxDimension = a.maxTextureSize || 2048,
                s.pdfRenderQuality = a.pdfRenderQuality || e.defaults.pdfRenderQuality,
                s.flipbook = r,
                s.waitPeriod = 50,
                s.maxLength = 297,
                s.enableDebug = !1,
                s.zoomScale = 1,
                s.maxZoom = 2,
                s.options = a,
                s.outline = a.outline,
                s.links = a.links,
                s.html = a.html,
                s.isCrossOrigin = a.isCrossOrigin,
                s.normalViewport = {
                    height: 297,
                    width: 210,
                    scale: 1
                },
                s.viewport = {
                    height: 297,
                    width: 210,
                    scale: 1
                },
                s.imageViewport = {
                    height: 297,
                    width: 210,
                    scale: 1
                },
                s.bookSize = {
                    height: 297,
                    width: 210
                },
                s.zoomViewport = {
                    height: 297,
                    width: 210
                },
                s.thumbsize = 128,
                s.cacheIndex = 256,
                s.cache = [],
                s.pageRatio = a.pageRatio || s.viewport.width / s.viewport.height,
                s.textureLoadTimeOut = null,
                s.type = "TextureLibrary",
            Array === s.contentSource.constructor || Array.isArray(s.contentSource) || s.contentSource instanceof Array)
                s.contentSourceType = l.IMAGE,
                    s.pageCount = s.contentSource.length,
                    t("<img/>").attr("src", s.contentSource[0]).on("load", function () {
                        s.viewport.height = this.height,
                            s.viewport.width = this.width,
                            s.pageRatio = s.viewport.width / s.viewport.height,
                            s.bookSize = {
                                width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
                                height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio)
                            },
                            s.zoomViewport = {
                                width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
                                height: s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio)
                            },
                            s.linkService = new PDFLinkService,
                            t(this).off(),
                        s.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && (s.pageCount = 2 * s.contentSource.length - 2,
                        1 == s.options.webgl && (s.requiresImageTextureScaling = !0)),
                        null != o && (o(s),
                            o = null),
                            O(this.height + ":" + this.width)
                    });
            else if ("string" == typeof s.contentSource || s.contentSource instanceof String) {
                var c = function () {
                    if (s) {
                        PDFJS.workerSrc = i.pdfjsWorkerSrc,
                            s.contentSourceType = l.PDF,
                            PDFJS.disableAutoFetch = !0,
                            PDFJS.disableStream = !0,
                        (F || B) && (PDFJS.disableFontFace = F || B),
                            PDFJS.imageResourcesPath = i.imageResourcesPath,
                            PDFJS.cMapUrl = i.cMapUrl,
                            PDFJS.cMapPacked = !0,
                            PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;
                        var t = s.loading = PDFJS.getDocument(s.options.docParameters ? s.options.docParameters : {
                            url: n,
                            rangeChunkSize: isNaN(e.defaults.rangeChunkSize) ? 524288 : e.defaults.rangeChunkSize
                        });
                        t.then(function (t) {
                            s.pdfDocument = t,
                                t.getPage(1).then(function (n) {
                                    s.normalViewport = n.getViewport(1),
                                        s.viewport = n.getViewport(1),
                                        s.viewport.height = s.viewport.height / 10,
                                        s.viewport.width = s.viewport.width / 10,
                                        s.pageRatio = s.viewport.width / s.viewport.height,
                                        s.bookSize = {
                                            width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
                                            height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio)
                                        },
                                        s.zoomViewport = {
                                            width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
                                            height: s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio)
                                        },
                                        s.refPage = n,
                                        t.numPages > 1 ? t.getPage(2).then(function (n) {
                                            if (s.options.pageSize == e.PAGE_SIZE.AUTO) {
                                                var i = n.getViewport(1);
                                                i.width / i.height > 1.5 * s.pageRatio ? (s.options.pageSize = e.PAGE_SIZE.DOUBLEINTERNAL,
                                                    s.pageCount = 2 * t.numPages - 2) : s.options.pageSize = e.PAGE_SIZE.SINGLE
                                            }
                                            null != o && (o(s),
                                                o = null)
                                        }) : null != o && (o(s),
                                            o = null)
                                }),
                                s.linkService = new PDFLinkService,
                                s.linkService.setDocument(t, null),
                                s.pageCount = t.numPages,
                                s.contentSource = t
                        }, function (e) {
                            if (s) {
                                var t = ""
                                    , n = document.createElement("a");
                                n.href = s.contentSource,
                                n.hostname !== window.location.hostname && (t = "CROSS ORIGIN!! "),
                                    s.updateInfo(t + "Cannot access file!  " + s.contentSource)
                            }
                        }),
                            t.onProgress = function (e) {
                                if (s) {
                                    var t = 100 * e.loaded / e.total;
                                    isNaN(t) ? e && e.loaded ? s.updateInfo("Carregando Álbum " + (Math.ceil(e.loaded / 1e4) / 100).toString() + "MB ...") : s.updateInfo("Carregando Álbum...") : s.updateInfo("Carregando Álbum " + t.toString().split(".")[0] + "%...")
                                }
                            }
                    }
                }
                    , d = function () {
                    if (s) {
                        i.pdfjsWorkerSrc += "?ver=" + e.version,
                            s.updateInfo("Carregando Álbum...");
                        var n = document.createElement("a");
                        n.href = i.pdfjsWorkerSrc,
                            n.hostname !== window.location.hostname ? (s.updateInfo("Carregando Álbum..."),
                                t.ajax({
                                    url: i.pdfjsWorkerSrc,
                                    cache: !0,
                                    success: function (t) {
                                        i.pdfjsWorkerSrc = e.createObjectURL(t, "text/javascript"),
                                            c()
                                    }
                                })) : c()
                    }
                };
                null == window.PDFJS ? s && (s.updateInfo("Carregando Álbum..."),
                    L(i.pdfjsSrc + "?ver=" + e.version, function () {
                        "function" == typeof define && define.amd ? (s.updateInfo("Carregando Álbum..."),
                            require.config({
                                paths: {
                                    "pdfjs-dist/build/pdf.worker": i.pdfjsWorkerSrc.replace(".js", "")
                                }
                            }),
                            require(["pdfjs-dist/build/pdf"], function (e) {
                                d()
                            })) : d()
                    }, function () {
                        s.updateInfo("Não foi possível carregar o Álbum...")
                    })) : c()
            } else
                console.error("Unknown source type. Please check documentation for help");
            return this.dispose = function () {
                s.loading && s.loading.destroy && s.loading.destroy(),
                    s.loading = null,
                this.targetObject && (this.targetObject.thumbContainer && this.targetObject.thumbContainer.remove && this.targetObject.thumbContainer.remove(),
                this.targetObject.outlineContainer && this.targetObject.outlineContainer.remove && this.targetObject.outlineContainer.remove(),
                this.targetObject.dispose && this.targetObject.dispose(),
                    this.targetObject.processPage = null,
                    this.targetObject.requestPage = null,
                this.targetObject.container && this.targetObject.container.off && this.targetObject.container.off()),
                this.pdfDocument && this.pdfDocument.destroy && this.pdfDocument.destroy(),
                this.linkService && this.linkService.dispose && this.linkService.dispose(),
                this.outlineViewer && this.outlineViewer.dispose && this.outlineViewer.dispose(),
                this.thumblist && this.thumblist.dispose && this.thumblist.dispose(),
                    this.targetObject = null,
                    this.pdfDocument = null,
                    this.linkService = null,
                    this.outlineViewer = null,
                    this.thumblist = null,
                    s = null
            }
                ,
                this
        }

        D(o, n);
        var a = null;
        return o.prototype.updateInfo = function (e) {
            this.flipbook && this.flipbook.updateInfo && this.flipbook.updateInfo(e)
        }
            ,
            o.prototype.initThumbs = function () {
                var e = this;
                null == e.cache[e.thumbsize] && (e.cache[e.thumbsize] = []);
                var n, i = function () {
                    clearTimeout(n),
                        n = setTimeout(function () {
                            n = setTimeout(o, e.waitPeriod / 2)
                        }, e.waitPeriod)
                }, o = function () {
                    var o = 0;
                    Date.now() - e.thumblist.lastScrolled < 100 ? o = 1 : (e.targetObject.container.find(".df-thumb-container .df-vrow").each(function () {
                        var n = t(this);
                        if (!n.hasClass("df-thumb-loaded")) {
                            o++;
                            var a = t(this).attr("id").replace("df-thumb", "");
                            return e.getPage(a, i, !0),
                                n.addClass("df-thumb-loaded"),
                                !1
                        }
                    }),
                    0 == o && clearTimeout(n)),
                    o > 0 && i()
                };
                e.thumblist = e.targetObject.thumblist = new ThumbList({
                    h: 500,
                    addFn: function (e) {
                    },
                    scrollFn: i,
                    itemHeight: 128,
                    totalRows: e.pageCount,
                    generatorFn: function (e) {
                        var t = document.createElement("div")
                            , n = e + 1;
                        t.id = "df-thumb" + n;
                        var i = document.createElement("div");
                        return i.innerHTML = n,
                            t.appendChild(i),
                            t
                    }
                }),
                    e.thumblist.lastScrolled = Date.now(),
                    i();
                var a = t("<div>").addClass("df-thumb-container df-sidemenu-visible df-sidemenu");
                a.append(t(e.thumblist.container).addClass("df-thumb-wrapper")),
                    e.targetObject.thumbContainer = a,
                    e.targetObject.container.append(a);
                var r = t(u.div, {
                    class: "df-ui-btn df-ui-sidemenu-close ti-close"
                });
                a.append(r),
                    e.thumblist.reset(t(e.thumblist.container).height()),
                    e.targetObject.container.on("click", ".df-thumb-container .df-vrow", function (n) {
                        n.stopPropagation();
                        var i = t(this).attr("id").replace("df-thumb", "");
                        e.targetObject.gotoPage(parseInt(i, 10))
                    })
            }
            ,
            o.prototype.initOutline = function () {
                function e(e) {
                    if (1 == n.options.overwritePDFOutline && (e = []),
                        e = e || [],
                        n.outline)
                        for (var t = 0; t < n.outline.length; t++)
                            n.outline[t].custom = !0,
                            e && e.push(n.outline[t]);
                    n.outlineViewer.render({
                        outline: e
                    })
                }

                var n = this
                    , i = t("<div>").addClass("df-outline-container df-sidemenu")
                    , o = t("<div>").addClass("df-outline-wrapper")
                    , a = t(u.div, {
                    class: "df-ui-btn df-ui-sidemenu-close ti-close"
                });
                i.append(a).append(o),
                    n.targetObject.container.append(i),
                    n.targetObject.outlineContainer = i,
                    n.outlineViewer = new BookMarkViewer({
                        container: o[0],
                        linkService: n.linkService,
                        outlineItemClass: "df-outline-item",
                        outlineToggleClass: "df-outline-toggle",
                        outlineToggleHiddenClass: "df-outlines-hidden"
                    }),
                    n.pdfDocument ? n.pdfDocument.getOutline().then(function (t) {
                        e(t)
                    }) : e([]),
                1 == n.options.autoEnableOutline && n.targetObject.ui.outline.trigger("click"),
                1 == n.options.autoEnableThumbnail && n.targetObject.ui.thumbnail.trigger("click")
            }
            ,
            o.prototype.checkViewportSize = function (e, t, n) {
                var o = this
                    , a = o.targetObject
                    , r = e * n
                    , s = t * n
                    , c = o.cacheIndex;
                if (o.contentSourceType == l.PDF) {
                    if (o.cacheIndex = Math.ceil(Math.max(r, s)),
                        o.cacheIndex = Math.floor(Math.max(r, s)),
                        o.cacheIndex = b(o.cacheIndex * i.pixelRatio, o.minDimension, o.maxDimension),
                    null == o.cache[o.cacheIndex] && (o.cache[o.cacheIndex] = []),
                    c !== o.cacheIndex) {
                        for (var d = 0; d < a.children.length; d++)
                            a.children[d];
                        a.refresh()
                    }
                    o.imageViewport = o.refPage.getViewport(s / o.normalViewport.height),
                        o.viewport = "css" == a.mode ? o.imageViewport : o.refPage.getViewport(o.bookSize.height / o.normalViewport.height),
                        O(o.cacheIndex);
                    var u = a.container.find(".linkAnnotation")
                        , h = o.viewport.clone({
                        dontFlip: !0
                    });
                    u.css({
                        transform: "matrix(" + h.transform.join(",") + ")"
                    })
                } else
                    null == o.cache[o.cacheIndex] && (o.cache[o.cacheIndex] = [])
            }
            ,
            o.prototype.getCache = function (e, t) {
                return 1 == t ? null == this.cache[this.thumbsize] ? null : this.cache[this.thumbsize][e] : null == this.cache[this.cacheIndex] ? null : this.cache[this.cacheIndex][e]
            }
            ,
            o.prototype.setCache = function (e, t, n, i) {
                if (1 == n)
                    null != this.cache[this.thumbsize] && (this.cache[this.thumbsize][e] = t);
                else {
                    var o = null == i ? this.cacheIndex : i;
                    null != this.cache[o] && (this.cache[o][e] = t)
                }
            }
            ,
            o.prototype.setTarget = function (e) {
                var t = this;
                if (null == e)
                    return this.targetObject;
                this.targetObject = e,
                    e.contentProvider = this,
                    e.container.removeClass("df-loading df-init"),
                null != t.linkService && (t.linkService.setViewer(e),
                    t.initOutline()),
                    e.processPage = function (e, n) {
                        e > 0 && e <= t.pageCount ? t.getPage(e, n) : t.setPage(e, i.textureLoadFallback, n)
                    }
                    ,
                    e.requestPage = function () {
                        t.review("Request")
                    }
                    ,
                null != e.resize && e.resize()
            }
            ,
            o.prototype.review = function (e) {
                var t = this;
                e = e || "timer review",
                    clearTimeout(a),
                    a = setTimeout(function () {
                        a = setTimeout(t.reviewPages, t.waitPeriod / 2, t, e)
                    }, t.waitPeriod)
            }
            ,
            o.prototype.reviewPages = function (e, n) {
                var i = (e = e || this).targetObject;
                if (null != i) {
                    var o = I(i);
                    null != n && O(n);
                    var a, r = !1;
                    for (a = 0; a < e.targetObject.children.length; a++)
                        if (1 == i.children[a].isFlipping) {
                            r = !0;
                            break
                        }
                    if (0 == r) {
                        var s = i.children.length > 3 ? 3 : i.children.length
                            , l = o ? i._activePage : E(i._activePage);
                        for (e.baseNumber = l,
                             e.zoomScale > 1 && (s = 1),
                                 a = 0; a < s; a++) {
                            var c = Math.floor(a / 2)
                                , d = a % 2 == 0 ? -c * (o ? 1 : 2) : (0 == c ? 1 : c) * (o ? 1 : 2)
                                , u = l + d
                                , h = l + d + 1
                                , p = i.getPageByNumber(u)
                                , g = i.getPageByNumber(h)
                                , f = u + "|" + e.cacheIndex
                                , m = h + "|" + e.cacheIndex
                                , v = 0;
                            if (null != p && p.frontPageStamp != f && 1 == p.visible && (p.frontTextureLoaded = !1,
                                i.processPage(u, function () {
                                    e.review("Batch Call")
                                }),
                                p.frontPageStamp = f,
                                v++),
                            null == g || g.backPageStamp == m || 1 != g.visible || o || (g.backTextureLoaded = !1,
                                i.processPage(h, function () {
                                    e.review("Batch Call")
                                }),
                                g.backPageStamp = m,
                                v++),
                            0 == d && e.annotedPage !== l && (e.getAnnotations(u),
                            o || e.getAnnotations(h),
                                e.annotedPage = l),
                            v > 0)
                                break
                        }
                        0 == v && "css" !== i.mode && e.setLoading(l)
                    } else if (e.review("Revisit request"),
                    null != e.annotedPage && "css" !== i.mode) {
                        var b = E(i._activePage);
                        t(i.getContentLayer(b)).html(""),
                            t(i.getContentLayer(b + 1)).html(""),
                            e.annotedPage = null
                    }
                }
            }
            ,
            o.prototype.getPage = function (t, n, o) {
                function a(t, n, i, o) {
                    var a = r.options.forceFit
                        , s = r.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && n > 1 && n < r.pageCount
                        , l = s && a ? 2 : 1
                        , c = a ? t.getViewport(1) : r.normalViewport
                        , d = r.cacheIndex / Math.max(c.width / l, c.height);
                    1 == r.webgl && (d = C(r.cacheIndex) / (r.pageRatio > 1 ? c.width / l : c.height));
                    var u = document.createElement("canvas")
                        , h = performance.now()
                        , p = r.cacheIndex
                        , g = u.getContext("2d");
                    1 == o && (d = r.thumbsize / r.normalViewport.height),
                        u.height = Math.round(c.height * d),
                        u.width = Math.round(c.width / l * d),
                    "css" == r.targetObject.mode && Math.abs(r.targetObject.zoomHeight - u.height) < 2 && (u.height = r.targetObject.zoomHeight + 0,
                        u.width = r.targetObject.zoomWidth + 0),
                        c = t.getViewport(d),
                        O("rendering " + n + " at " + u.width + "x" + u.height),
                    s && (R(r.targetObject) ? n % 2 == 0 && (c.transform[4] = -u.width) : n % 2 == 1 && (c.transform[4] = -u.width));
                    var f = {
                        canvasContext: g,
                        viewport: c
                    };
                    t.cleanupAfterRender = !0,
                        t.render(f).promise.then(function () {
                            O(performance.now() - h),
                                h = performance.now(),
                                1 == o || 1 == r.options.canvasToBlob && !0 !== r.webgl ? u.toBlob(function (t) {
                                    var a = e.createObjectURL(t, "image/jpeg");
                                    O(performance.now() - h),
                                        r.setCache(n, a, o, p),
                                        r.setPage(n, a, i, o)
                                }, "image/jpeg", r.pdfRenderQuality) : (O("Setting Page " + n),
                                    r.setPage(n, u, i, o)),
                                f = null
                        })
                }

                var r = this
                    , s = t = parseInt(t, 10)
                    , c = r.contentSource;
                t <= 0 && t >= r.pageCount ? r.setPage(t, i.textureLoadFallback, n, o) : r.contentSourceType == l.PDF ? null != r.getCache(t, o) ? (r.setPage(t, r.getCache(t, o), n, o),
                    O("Page " + t + " loaded from cache")) : (!0 !== o && r.setLoading(t, !0),
                r.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && t > 2 && (s = Math.ceil((t - 1) / 2) + 1),
                    c.getPage(s, o).then(function (e) {
                        a(e, t, n, o)
                    })) : r.contentSourceType != l.IMAGE && r.contentSourceType != l.HTML || (null != r.getCache(t, o) ? (r.setPage(t, r.getCache(t, o), n, o),
                    O("Page " + t + " loaded from cache")) : (!0 !== o && r.setLoading(t, !0),
                r.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && t > 2 && (s = Math.ceil((t - 1) / 2) + 1),
                    function (t, n, o) {
                        var a = new Image;
                        a.crossOrigin = "Anonymous",
                            a.onload = function () {
                                if (1 == o) {
                                    var r = document.createElement("canvas")
                                        , s = r.getContext("2d");
                                    r.width = a.width,
                                        r.height = a.height,
                                        ctx.mozImageSmoothingEnabled = true;
                                    ctx.webkitImageSmoothingEnabled = true;
                                    ctx.msImageSmoothingEnabled = true;
                                    ctx.imageSmoothingEnabled = true;
                                    s.drawImage(a, 0, 0),
                                        1 == i.canvasToBlob ? r.toBlob(function (t) {
                                            var i = e.createObjectURL(t, "image/jpeg");
                                            null != n && n(i)
                                        }, "image/jpeg", 1) : null != n && n(r)
                                } else
                                    null != n && n(t);
                                a.onload = null,
                                    a = null
                            }
                            ,
                            a.src = t,
                        (a.complete || void 0 === a.complete) && (a.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
                            a.src = t)
                    }(c[s - 1], function (e) {
                        r.setCache(t, e, o, r.cacheIndex),
                            r.setPage(t, e, n, o),
                        null != n && n()
                    }, r.isCrossOrigin)))
            }
            ,
            o.prototype.getTargetPage = function (e) {
            }
            ,
            o.prototype.setLoading = function (e, n) {
                if (null != this.targetObject)
                    if (1 == this.webgl) {
                        var i = this.targetObject.container;
                        1 == n ? !0 !== i.isLoading && (i.addClass("df-loading"),
                            i.isLoading = !0,
                            O("Loading icon at " + e + " as " + n)) : null != i.isLoading && (i.removeClass("df-loading"),
                            i.isLoading = null,
                            O("Loading icon at " + e + " as " + n))
                    } else {
                        var o = t(this.targetObject.getContentLayer(e));
                        null != o && (1 == n ? o.addClass("df-page-loading") : o.removeClass("df-page-loading"),
                            O("Loading icon at " + e + " as " + n))
                    }
            }
            ,
            o.prototype.getAnnotations = function (n) {
                var i = this;
                if (0 != i.options.enableAnnotation) {
                    var o = i.targetObject;
                    n = parseInt(n, 10);
                    var a = i.contentSource
                        , r = t(o.getContentLayer(n));
                    if (r.empty(),
                    n > 0 && n <= i.pageCount) {
                        if (i.contentSourceType == l.PDF) {
                            E(n);
                            var s = n;
                            i.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && n > 2 && (s = Math.ceil((n - 1) / 2) + 1),
                                a.getPage(s).then(function (e) {
                                    null != r && r.length > 0 && i.setupAnnotations(e, i.viewport, r, n)
                                })
                        }
                        if (null != i.links && null != i.links[n])
                            for (var c = i.links[n], d = 0; d < c.length; d++) {
                                var u, h = c[d];
                                h.dest && h.dest.indexOf && 0 == h.dest.indexOf("[html]") ? ((u = document.createElement("div")).innerHTML = h.dest.substr(6),
                                    u.className = "customHtmlAnnotation") : ((u = document.createElement("a")).setAttribute("dest", h.dest),
                                        u.className = "customLinkAnnotation",
                                        u.href = h.dest,
                                        u.onclick = function () {
                                            var e = this.getAttribute("dest");
                                            return e && i.linkService.customNavigateTo(e),
                                                !1
                                        }
                                ),
                                    u.style.left = h.x + "%",
                                    u.style.top = h.y + "%",
                                    u.style.width = h.w + "%",
                                    u.style.height = h.h + "%",
                                    r[0].appendChild(u)
                            }
                        if (null != i.html && null != i.html[n]) {
                            var p = i.html[n];
                            r.append(t("<div class='customHTMLAnnotation'>").html(p))
                        }
                    }
                }
            }
            ,
            o.prototype.setPage = function (e, t, n, o) {
                var a = this
                    , r = a.targetObject
                    , s = R(r)
                    , l = I(r);
                if (1 == o)
                    a.targetObject.container.find("#df-thumb" + e).css({
                        backgroundImage: v(t)
                    });
                else {
                    t == i.textureLoadFallback && O("Fallback on " + e);
                    var c = r.getPageByNumber(e);

                    null != c ? e % 2 != 0 && !s || e % 2 != 1 && s && !l || l && !s ? (O(e + "rendered to back of " + c.color),
                        c.backImage(t, function (t, i) {
                            c.backTextureLoaded = !0,
                                a.setLoading(e),
                            a.requiresImageTextureScaling && i && 1 != e && e != a.pageCount && (i.repeat.x = .5,
                                i.offset.x = .5),
                            null != n && n()
                        })) : (O(e + "rendered to front of " + c.color),
                        c.frontImage(t, function (t, i) {
                            c.frontTextureLoaded = !0,
                                a.setLoading(e),
                            a.requiresImageTextureScaling && i && 1 != e && e != a.pageCount && (i.repeat.x = .5),
                            null != n && n()
                        })) : O("Invalid set request on Page " + e)
                }
            }
            ,
            o.prototype.setupAnnotations = function (n, i, o, a) {
                if (null != o && 0 != t(o).length) {
                    var r = this;
                    return n.getAnnotations().then(function (s) {
                        if (i = i.clone({
                            dontFlip: !0
                        }),
                            r.options.pageSize,
                            e.PAGE_SIZE.DOUBLEINTERNAL,
                        null != o) {
                            0 == (o = t(o)).find(".annotationDiv").length && o.append(t("<div class='annotationDiv'>"));
                            var l = o.find(".annotationDiv");
                            l.empty(),
                                r.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && a > 2 && a % 2 == 1 ? l.css({
                                    left: "-100%"
                                }) : 1 == a && l.css({
                                    left: ""
                                }),
                                PDFJS.AnnotationLayer.render({
                                    annotations: s,
                                    div: l[0],
                                    page: n,
                                    viewport: i,
                                    linkService: r.linkService
                                }),
                            r.options.annotationClass && "" !== r.options.annotationClass && l.find(" > section").addClass(r.options.annotationClass),
                                t(function () {
                                    t('a[rel$="referrer"]').prop("target", "_blank"),
                                        t('a[href*="watch?v="]').prop("class", "lightboxX"),
                                        t('a[href*="watch?v="]').attr("target", "_self"),
                                        t('a[href*="youtu.be"]').prop("class", "lightboxX"),
                                        t('a[href*="youtu.be"]').attr("target", "_self"),
                                        t('a[href*="/vimeo"]').prop("class", "lightboxX"),
                                        t('a[href*="/vimeo"]').attr("target", "_self"),
                                        t('a[href*="/www.vimeo"]').prop("class", "lightboxX"),
                                        t('a[href*="/www.vimeo"]').attr("target", "_self"),
                                        t('a[href*="youtube.com/embed/"]').prop("class", "lightboxX"),
                                        t('a[href*="youtube.com/embed/"]').attr("target", "_self");
                                    e = t('a[href*="youtube.com/embed/"]').attr("href");
                                    t('a[href*="youtube.com/embed/"]').attr("href", e + "?lightbox[iframe]=true&lightbox[width]=960&lightbox[height]=540"),
                                        t('a[href*="player.vimeo"]').prop("class", "lightboxX"),
                                        t('a[href*="player.vimeo"]').attr("target", "_self");
                                    var e = t('a[href*="player.vimeo"]').attr("href");
                                    t('a[href*="player.vimeo"]').attr("href", e + "?lightbox[iframe]=true&lightbox[width]=960&lightbox[height]=540"),
                                        t('a[href$="jpg"]').prop("class", "lightboxX"),
                                        t('a[href$="jpg"]').attr("target", "_self"),
                                        t('a[href$="png"]').prop("class", "lightboxX"),
                                        t('a[href$="png"]').attr("target", "_self"),
                                        t('a[href$="gif"]').prop("class", "lightboxX"),
                                        t('a[href$="gif"]').attr("target", "_self"),
                                        t('a[href*="watch?v="]').prop("class", "lightboxX"),
                                        t('a[href*="watch?v="]').attr("target", "_self")
                                })
                        }
                    })
                }
            }
            ,
            o
    }({})
        , U = function () {
        function n(e) {
            this.angles = e.angles || [0, 0, 0, 0, 0, 0],
                this.stiffness = e.angles || .1,
                this.segments = e.segments || 1,
                this.canvasMode = e.contentSourceType !== l.IMAGE && 0 == e.canvasToBlob,
                this.initDOM()
        }

        function o(e) {
            var n = e.contentLayer = t(u.div, {
                class: "df-page-content"
            });
            e.append(n)
        }

        return n.prototype = {
            initDOM: function () {
                var e = this.element = t(u.div, {
                    class: "df-book-page"
                })
                    , n = this.wrapper = t(u.div, {
                    class: "df-page-wrapper"
                })
                    , i = this.front = t(u.div, {
                    class: "df-page-front"
                })
                    , a = this.back = t(u.div, {
                    class: "df-page-back"
                })
                    , r = this.foldInnerShadow = t(u.div, {
                    class: "df-page-fold-inner-shadow"
                })
                    , s = this.foldOuterShadow = t(u.div, {
                    class: "df-page-fold-outer-shadow"
                });
                this.frontIMG = new Image,
                    this.backIMG = new Image,
                    o(i, this.segments),
                    o(a, this.segments),
                    e.append(n).append(s),
                    n.append(i).append(a).append(r)
            },
            updatePoint: function (t) {
                if (null != t) {
                    var n = null != this.parent.dragPage ? this.parent.dragPage : null != t.page ? t.page : this
                        , i = n.element.width()
                        , o = n.element.height()
                        , a = null != this.parent.corner ? this.parent.corner : t.corner
                        , r = e.CORNERS
                        , s = n.side == c.right
                        , l = a == r.BL || a == r.BR;
                    t.rx = 1 == s ? 2 * i - t.x : t.x,
                        t.ry = 1 == l ? o - t.y : t.y;
                    var d = Math.atan2(t.ry, t.rx);
                    d = Math.PI / 2 - b(d, 0, p(90));
                    var u = s ? t.x / 2 : i - t.x / 2
                        , h = t.ry / 2
                        , v = Math.max(0, Math.sin(d - Math.atan2(h, u)) * w(u, h))
                        , P = .5 * w(t.rx, t.ry)
                        , y = Math.round(i - v * Math.sin(d))
                        , O = Math.round(v * Math.cos(d))
                        , C = g(d)
                        , x = l ? s ? 90 - C + 180 : 180 + C : s ? C : 90 - C
                        , E = l ? s ? 90 - C + 180 : C : s ? C + 180 : x
                        , L = l ? s ? 90 - C : C + 90 : s ? x - 90 : x + 180
                        , S = s ? i - y : y
                        , I = l ? o + O : -O
                        , R = s ? -y : y - i
                        , T = l ? -o - O : O
                        , M = b(.5 * t.distance / i, 0, .5)
                        , F = b(.5 * (2 * i - t.rx) / i, .05, .3);
                    n.element.addClass("df-folding");
                    var B = s ? n.back : n.front
                        , D = s ? n.front : n.back
                        , z = n.foldOuterShadow
                        , N = n.foldInnerShadow;
                    n.wrapper.css({
                        transform: f(S, I) + m(x)
                    }),
                        B.css({
                            transform: m(-x) + f(-S, -I)
                        }),
                        D.css({
                            transform: m(E) + f(R, T),
                            boxShadow: "rgba(0, 0, 0, " + M + ") 0px 0px 20px"
                        }),
                        N.css({
                            transform: m(E) + f(R, T),
                            opacity: F / 2,
                            backgroundImage: k.css + "linear-gradient( " + L + "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " + .7 * P + "px, rgb(255, 255, 255) " + P + "px)"
                        }),
                        z.css({
                            opacity: F / 2,
                            left: s ? "auto" : 0,
                            right: s ? 0 : "auto",
                            backgroundImage: k.css + "linear-gradient( " + (180 - L) + "deg, rgba(0, 0, 0,0) " + P / 3 + "px, rgb(0, 0, 0) " + P + "px)"
                        })
                }
            },
            updateAngle: function (e, t) {
                var n = 5 * this.element.width();
                this.wrapper.css({
                    perspective: n,
                    perspectiveOrigin: 1 == t ? "0% 50%" : "100% 50%"
                }),
                    this.front.css({
                        display: 1 == t ? e <= -90 ? "block" : "none" : e < 90 ? "block" : "none",
                        transform: ("MfS" !== k.dom ? "" : "perspective(" + n + "px) ") + (1 == t ? "translateX(-100%) " : "") + "rotateY(" + ((1 == t ? 180 : 0) + e) + "deg)"
                    }),
                    this.back.css({
                        display: 1 == t ? e > -90 ? "block" : "none" : e >= 90 ? "block" : "none",
                        transform: ("MSd" !== k.dom ? "" : "perspective(" + n + "px) ") + (0 == t ? "translateX(100%) " : "") + "rotateY(" + ((0 == t ? -180 : 0) + e) + "deg)"
                    })
            },
            tween: function (t) {
                var n = this;
                if (null != n && null != n.parent) {
                    var i, o = I(n.parent), a = n.side == c.right, r = n.parent.direction == e.DIRECTION.RTL,
                        s = n.parent.corner == e.CORNERS.BL || n.parent.corner == e.CORNERS.BR, l = 1 == n.magnetic,
                        d = s ? n.parent.height : 0, u = 0, h = n.end = n && 1 == n.animateToReset ? {
                            x: a ? n.parent.fullWidth : 0,
                            y: d
                        } : {
                            x: a ? 0 : n.parent.fullWidth,
                            y: d
                        };
                    n.ease = n.isHard ? TWEEN.Easing.Quadratic.InOut : TWEEN.Easing.Linear.None;
                    var p = n.parent.duration;
                    1 == n.isHard ? (null != t && (u = y(t.distance, t.fullWidth)),
                        i = n.init = {
                            angle: u * (a ? -1 : 1)
                        },
                        h = n.end = n && 1 == n.animateToReset ? {
                            angle: a ? 0 : -0
                        } : {
                            angle: a ? -180 : 180
                        }) : null == t ? (i = n.init = n && 1 == n.animateToReset ? {
                        x: a ? 0 : n.parent.fullWidth,
                        y: 0
                    } : {
                        x: a ? n.parent.fullWidth : 0,
                        y: 0
                    },
                        n.first = {
                            x: (a ? 3 : 1) * n.parent.fullWidth / 4,
                            y: 0
                        },
                        n.mid = {
                            x: (a ? 1 : 3) * n.parent.fullWidth / 4,
                            y: 0
                        }) : (i = n.init = {
                        x: t.x,
                        y: t.y,
                        opacity: 1
                    },
                        n.first = {
                            x: 3 * t.x / 4,
                            y: 3 * t.y / 4,
                            opacity: 1
                        },
                        n.mid = {
                            x: t.x / 4,
                            y: t.y / 4,
                            opacity: 1
                        },
                        p = n.parent.duration * P(i.x, i.y, h.x, h.y) / n.parent.fullWidth,
                        p = b(p, n.parent.duration / 3, n.parent.duration)),
                        i.index = 0,
                        h.index = 1,
                        n.isFlipping = !0;
                    var g = function (e) {
                        1 == n.isHard ? (n.updateAngle(e.angle, a),
                            n.angle = e.angle) : (n.updatePoint({
                            x: e.x,
                            y: e.y
                        }),
                            n.x = e.x,
                            n.y = e.y),
                        o && !l && (n.element[0].style.opacity = a && !r || !a && r ? e.index > .5 ? 2 * (1 - e.index) : 1 : e.index < .5 ? 2 * e.index : 1)
                    };
                    o && (!a && !r || a && r) && (n.element[0].style.opacity = 0);
                    n.completeTween = n.completeTween || function (t) {
                        n.isFlipping = !1,
                            1 == n.isHard ? (n.updateAngle(n.end.angle),
                                n.back.css({
                                    display: "block"
                                }),
                                n.front.css({
                                    display: "block"
                                })) : n.updatePoint({
                                x: n.end.x,
                                y: n.end.y
                            }),
                            n.element[0].style.opacity = 1,
                            !0 !== n.animateToReset ? n.side = n.side == c.right ? c.left : c.right : n.animateToReset = null,
                            n.currentTween = null,
                            n.pendingPoint = null,
                            n.magnetic = !1,
                            n.parent.dragPage = null,
                            n.parent.corner = e.CORNERS.NONE,
                        1 != t && n.parent.refresh()
                    }
                    ;
                    1 == n.isHard ? n.currentTween = new TWEEN.Tween(i).delay(0).to(h, n.parent.duration).onUpdate(function () {
                        g(this)
                    }).easing(n.ease).onComplete(n.completeTween).start() : null == t ? n.currentTween = new TWEEN.Tween(i).delay(0).to(h, n.parent.duration).onUpdate(function () {
                        g(this)
                    }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(n.completeTween).start() : (n.currentTween = new TWEEN.Tween(i).delay(0).to(h, p).onUpdate(function () {
                        g(this)
                    }).easing(TWEEN.Easing.Sinusoidal.Out).onComplete(n.completeTween),
                        n.currentTween.start())
                }
            },
            frontImage: function (e, n) {
                function o() {
                    a.front.css({
                        backgroundImage: v(e)
                    }),
                    null != n && n()
                }

                var a = this;
                1 == a.canvasMode ? (a.front.find(">canvas").remove(),
                e !== i.textureLoadFallback && a.front.append(t(e)),
                null != n && n()) : e == i.textureLoadFallback ? o() : (a.frontIMG.onload = o,
                    a.frontIMG.src = e)
            },
            backImage: function (e, n) {
                function o() {
                    a.back.css({
                        backgroundImage: v(e)
                    }),
                    null != n && n()
                }

                var a = this;
                1 == a.canvasMode ? (a.back.find(">canvas").remove(),
                e !== i.textureLoadFallback && a.back.append(t(e)),
                null != n && n()) : e == i.textureLoadFallback ? o() : (a.backIMG.onload = o,
                    a.backIMG.src = e)
            },
            updateCSS: function (e) {
                this.element.css(e)
            },
            resetCSS: function () {
                this.wrapper.css({
                    transform: ""
                }),
                    this.front.css({
                        transform: "",
                        boxShadow: ""
                    }),
                    this.back.css({
                        transform: "",
                        boxShadow: ""
                    })
            },
            clearTween: function (e) {
                this.currentTween.stop(),
                    this.completeTween(1 == e),
                    this.resetCSS()
            }
        },
            n
    }()
        , H = function (n) {
        function a(e) {
            e.parent.container.find(".df-folding").removeClass("df-folding"),
                e.element.addClass("df-folding")
        }

        function r(e) {
            for (var t = !1, n = 0; n < e.pages.length; n++)
                if (1 == e.pages[n].isFlipping) {
                    t = !0;
                    break
                }
            return t
        }

        function l(n, i) {
            function l(e) {
                d.dragPage != e.page && 1 == e.page.visible && (d.dragPage.clearTween(!0),
                    d.dragPage = e.page,
                    d.corner = e.corner,
                    d.dragPage.pendingPoint = e)
            }

            var d = this;
            d.type = "BookCSS",
                d.images = n.images || [],
                d.pageCount = n.pageCount || 2,
                d.foldSense = 50,
                d.stackCount = 4,
                d.mode = "css",
                d.pages = [],
                d.duration = n.duration,
                d.container = t(i),
                d.options = n,
                d.drag = c.none,
                d.pageCount = 1 == d.pageCount ? d.pageCount : 2 * Math.ceil(d.pageCount / 2),
                d.pageMode = n.pageMode || (T || d.pageCount <= 2 ? e.PAGE_MODE.SINGLE : e.PAGE_MODE.DOUBLE),
                d.singlePageMode = n.singlePageMode || (T ? e.SINGLE_PAGE_MODE.BOOKLET : e.SINGLE_PAGE_MODE.ZOOM),
                d.swipe_threshold = T ? 15 : 50,
                d.direction = n.direction || e.DIRECTION.LTR,
                d.startPage = 1,
                d.endPage = d.pageCount,
                d._activePage = n.openPage || d.startPage,
                d.hardConfig = n.hard,
                o = "WebKitCSSMatrix" in window || document.body && "MozPerspective" in document.body.style,
                d.animateF = function () {
                    TWEEN.getAll().length > 0 ? TWEEN.update() : clearInterval(d.animate)
                }
                ,
                d.init(n),
                d.skipDrag = !1;
            var u = function (t) {
                var n = d.eventToPoint(t);
                if (null != t.touches && 2 == t.touches.length && null != d.startTouches) {
                    d.zoomDirty = !0;
                    var i = s.getVectorAvg(s.getTouches(t, d.container.offset()))
                        , o = s.calculateScale(d.startTouches, s.getTouches(t));
                    d.lastScale,
                        d.contentProvider.zoomScale,
                        i.x,
                        i.y;
                    d.stage.css({
                        transform: "translate3d(" + d.left + "px," + d.top + "px,0) scale3d(" + o + "," + o + ",1)"
                    }),
                        d.lastScale = o,
                        d.lastZoomCenter = i,
                        t.preventDefault()
                }
                if (!(null != t.touches && t.touches.length > 1 || null == d.startPoint || null != d.startTouches)) {
                    var a = d.dragPage || n.page;
                    if (1 !== d.contentProvider.zoomScale)
                        null == t.touches && 1 != d.isPanning || (d.pan(n),
                            t.preventDefault());
                    else if (!0 !== d.skipDrag) {
                        n.distance;
                        if (!r(d)) {
                            if (null != d.dragPage || 1 == n.isInside) {
                                null != d.dragPage ? O("set mouse down move") : (n.y = b(n.y, 1, d.height - 1),
                                    n.x = b(n.x, 1, n.fullWidth - 1));
                                var l = d.corner || n.corner;
                                if (a.isHard) {
                                    var u = l == e.CORNERS.BR || l == e.CORNERS.TR
                                        , h = y(n.distance, n.fullWidth);
                                    a.updateAngle(h * (u ? -1 : 1), u)
                                } else
                                    a.updatePoint(n, d);
                                a.magnetic = !0,
                                    a.magneticCorner = n.corner,
                                    t.preventDefault()
                            }
                            if (null == d.dragPage && null != a && 0 == n.isInside && 1 == a.magnetic && (a.pendingPoint = n,
                                a.animateToReset = !0,
                                d.corner = a.magneticCorner,
                                d.animatePage(a),
                                a.pendingPoint = null,
                                a.magnetic = !1,
                                a.magneticCorner = null),
                            1 == d.isPanning && null == d.dragPage && 1 == d.contentProvider.zoomScale) {
                                var p = n.x - d.lastPos;
                                performance.now(),
                                    d.lastTime;
                                Math.abs(p) > d.swipe_threshold && (p < 0 ? d.next() : d.prev(),
                                    d.drag = c.none,
                                    d.isPanning = !1,
                                    t.preventDefault()),
                                    d.lastPos = n.x,
                                    d.lastTime = performance.now()
                            }
                        }
                    }
                }
            }
                , h = function (t) {
                if (null != t.touches && 0 == t.touches.length) {
                    d.contentProvider.zoomScale;
                    1 == d.zoomDirty && (d.previewObject.contentProvider.zoomScale = s.limitAt(d.previewObject.contentProvider.zoomScale * d.lastScale, 1, d.previewObject.contentProvider.maxZoom),
                        d.previewObject.zoomValue = 1 * d.previewObject.contentProvider.zoomScale,
                        d.previewObject.resize(),
                        d.zoomDirty = !1),
                        d.wrapper.css({
                            transform: ""
                        }),
                        d.lastScale = null,
                        d.startTouches = null
                }
                if (d.isPanning = !1,
                !(null != t.touches && t.touches.length > 1) && !0 !== d.skipDrag) {
                    var n = d.eventToPoint(t);
                    d.dragPage && (t.preventDefault(),
                        d.dragPage.pendingPoint = n,
                        n.x == d.startPoint.x && n.y == d.startPoint.y && 1 == n.isInside ? d.corner == e.CORNERS.BR || d.corner == e.CORNERS.TR ? (l(n),
                        !0 !== d.dragPage.isFlipping && d.next()) : d.corner != e.CORNERS.BL && d.corner != e.CORNERS.TL || (l(n),
                        !0 !== d.dragPage.isFlipping && d.prev()) : !0 !== d.dragPage.isFlipping && (n.distance > n.fullWidth / 2 ? n.x > n.fullWidth / 2 ? d.prev() : d.next() : (d.dragPage.animateToReset = !0,
                            d.animatePage(d.dragPage))),
                    d.dragPage && (d.dragPage.pendingPoint = null,
                        d.dragPage.magnetic = !1)),
                        d.drag = c.none
                }
            }
                , p = function (t) {
                var n = d.eventToPoint(t)
                    , i = t.srcElement || t.originalTarget;
                d.dragPage && d.dragPage.magnetic || d.wrapper[0].contains(t.target) && 1 == d.contentProvider.zoomScale && n.x == d.startPoint.x && n.y == d.startPoint.y && n.isInsidePage && d.startPoint.page == n.page && !n.page.isFlipping && "A" !== i.nodeName && (0 == d.startPoint.page.side ? (d.corner = e.CORNERS.TL,
                    d.prev(),
                    d.startPoint.page = null) : (d.corner = e.CORNERS.TR,
                    d.next(),
                    d.startPoint.page = null),
                    d.isPanning = !1)
            }
                , g = function (t) {
                if (null != t.touches && 2 == t.touches.length && null == d.startTouches && (d.startTouches = s.getTouches(t),
                    d.lastScale = 1),
                    !(null != t.touches && t.touches.length > 1 || null == t.touches && 0 !== t.button)) {
                    var n = d.eventToPoint(t);
                    d.startPoint = n,
                        d.left = d.left || 0,
                        d.top = d.top || 0,
                        d.isPanning = !0,
                        d.lastPos = n.x,
                        d.lastTime = performance.now(),
                    !0 !== d.skipDrag && (1 != n.isInside || r(d) || (d.startPoint = n,
                        d.drag = n.drag,
                        d.dragPage = n.page,
                        d.corner = n.corner,
                        O(d.corner),
                        a(d.dragPage),
                    n.page.isHard || n.page.updatePoint(n, d),
                        "0" == n.page.name ? d.shadow.css({
                            width: "50%",
                            left: d.direction == e.DIRECTION.RTL ? 0 : "50%",
                            transitionDelay: ""
                        }) : n.page.name == Math.ceil(d.pageCount / 2) - 1 && d.shadow.css({
                            width: "50%",
                            left: d.direction == e.DIRECTION.RTL ? "50%" : 0,
                            transitionDelay: ""
                        })))
                }
            }
                , f = function (e) {
                var t = 0;
                null != e.wheelDelta ? t = e.wheelDelta / 120 : null != e.detail && (t = -e.detail / 3);
                var n = d.contentProvider.zoomScale
                    , i = d.contentProvider.maxZoom;
                if (t && (t > 0 && n < i || t < 0 && n > 1)) {
                    e.stopPropagation(),
                        e.preventDefault();
                    var o = d.eventToPoint(e)
                        , a = d.eventToPoint(e)
                        , r = {
                        x: d.container.width() / 2,
                        y: d.container.height() / 2 - 23
                    };
                    d.previewObject.zoom(t);
                    var s = d.contentProvider.zoomScale;
                    if (n !== s) {
                        var l = s / n;
                        1 == s ? (d.left = 0,
                            d.top = 0) : (d.left *= l,
                            d.top *= l);
                        var c = (o.raw.x - r.x) * l
                            , u = (o.raw.y - r.y) * l;
                        a.raw.x = r.x + c,
                            a.raw.y = r.y + u,
                            d.startPoint = a,
                            d.pan(o);
                        var h = d.dragPage || o.page;
                        null == d.dragPage && null != h && 1 == o.isInside && 1 == h.magnetic && (h.pendingPoint = o,
                            h.animateToReset = !0,
                            d.corner = h.magneticCorner,
                            d.animatePage(h),
                            h.pendingPoint = null,
                            h.magnetic = !1,
                            h.magneticCorner = null)
                    }
                }
            }
                , m = d.container[0]
                , v = d.stage[0];
            m && (m.addEventListener("mousemove", u, !1),
                m.addEventListener("touchmove", u, !1),
                m.addEventListener("mousedown", g, !1),
                m.addEventListener("click", p, !1),
                m.addEventListener("mouseup", h, !1),
                m.addEventListener("touchend", h, !1),
                m.addEventListener("touchstart", g, !1),
            1 == d.options.scrollWheel && (v.addEventListener("mousewheel", f, !1),
                v.addEventListener("DOMMouseScroll", f, !1))),
                this.dispose = function () {
                    m.removeEventListener("mousemove", u, !1),
                        m.removeEventListener("touchmove", u, !1),
                        m.removeEventListener("mousedown", g, !1),
                        m.removeEventListener("click", p, !1),
                        m.removeEventListener("mouseup", h, !1),
                        m.removeEventListener("touchend", h, !1),
                        m.removeEventListener("touchstart", g, !1),
                    1 == d.options.scrollWheel && (v.removeEventListener("mousewheel", f, !1),
                        v.removeEventListener("DOMMouseScroll", f, !1)),
                        d.updatePageCallback = null,
                        d.flipCallback = null,
                        d.animateF = null,
                        d.stage.remove()
                }
        }

        return D(l, n),
            l.prototype = {
                add: function (e) {
                    e instanceof U ? this.container.append(t(e.element)) : this.container.append(t(e))
                },
                pan: function (e) {
                    var t = this.startPoint
                        , n = this.contentProvider.zoomScale
                        , i = this.left + (e.raw.x - t.raw.x)
                        , o = this.top + (e.raw.y - t.raw.y);
                    this.left = Math.round(b(i, -this.shiftWidth, this.shiftWidth)),
                        this.top = Math.round(b(o, -this.shiftHeight, this.shiftHeight)),
                    1 == n && (this.left = 0,
                        this.top = 0),
                        this.startPoint = e,
                        this.stage.css({
                            transform: "translate3d(" + this.left + "px," + this.top + "px,0)"
                        })
                },
                getPageByNumber: function (e) {
                    for (var t, n = I(this) ? R(this) ? e + 1 : e : Math.floor((e - 1) / 2), i = 0; i < this.pages.length; i++)
                        n == parseInt(this.pages[i].name, 10) && (t = this.pages[i]);
                    return t
                },
                getPageSide: function (t) {
                    var n = this.direction == e.DIRECTION.RTL
                        , i = this.getPageByNumber(t);
                    if (null != i)
                        return I(this) ? n ? i.front : i.back : t % 2 == 0 ? n ? i.back : i.front : n ? i.front : i.back
                },
                getContentLayer: function (e) {
                    var t = this.getPageSide(e);
                    return null == t ? null : t.contentLayer
                }
            },
            l.prototype.init = function (e) {
                var n = this;
                n.stage = t(u.div, {
                    class: "df-book-stage"
                }),
                    n.wrapper = t(u.div, {
                        class: "df-book-wrapper"
                    }),
                    n.shadow = t(u.div, {
                        class: "df-book-shadow"
                    }),
                    n.container.append(n.stage),
                    n.stage.append(n.wrapper),
                    n.wrapper.append(n.shadow),
                    n.createStack(e)
            }
            ,
            l.prototype.createStack = function (e) {
                for (var t = "red,green,blue,yellow,orange,black".split(","), n = 0; n < this.stackCount; n++) {
                    e.angles = [, this.stackCount - n],
                        e.stiffness = (this.stackCount - n) / 100;
                    var i = new U(e);
                    i.angles[1] = 180,
                        i.index = n,
                        i.parent = this,
                        i.textureReady = !1,
                        i.textureRequested = !1,
                        this.wrapper.append(i.element),
                        i.isFlipping = !1,
                        this.pages.push(i),
                        i.color = t[n]
                }
                this.children = this.pages
            }
            ,
            l.prototype.isPageHard = function (e) {
                return s.isHardPage(this.hardConfig, e, this.pageCount, I(this))
            }
            ,
            l.prototype.setDuration = function (e) {
                this.duration = e
            }
            ,
            l.prototype.moveBy = function (e) {
                var t = this._activePage + e;
                t = b(t, this.startPage, this.endPage),
                    this.gotoPage(t)
            }
            ,
            l.prototype.next = function (t) {
                null == t && (t = this.direction == e.DIRECTION.RTL ? -this.pageMode : this.pageMode),
                    this.moveBy(t)
            }
            ,
            l.prototype.prev = function (t) {
                null == t && (t = this.direction == e.DIRECTION.RTL ? this.pageMode : -this.pageMode),
                    this.moveBy(t)
            }
            ,
            l.prototype.eventToPoint = function (n) {
                n = S(n);
                var i = this.wrapper
                    , o = this.pages
                    , a = this.pageWidth
                    , r = this.fullWidth
                    , s = this.height
                    , l = (t(window),
                    {
                        x: n.clientX,
                        y: n.clientY
                    })
                    , d = l.x - i[0].getBoundingClientRect().left
                    , u = l.y - i[0].getBoundingClientRect().top;
                l.x = l.x - this.container[0].getBoundingClientRect().left,
                    l.y = l.y - this.container[0].getBoundingClientRect().top;
                var h, p = this.drag == c.none ? d < a ? d : r - d : this.drag == c.left ? d : r - d,
                    g = d < a ? o[this.stackCount / 2 - 1] : o[this.stackCount / 2],
                    f = d < this.foldSense ? c.left : d > r - this.foldSense ? c.right : c.none, m = d, v = u, b = s,
                    w = r, P = this.foldSense, y = e.CORNERS;
                return h = m >= 0 && m < P ? v >= 0 && v <= P ? y.TL : v >= b - P && v <= b ? y.BL : v > P && v < b - P ? y.L : y.NONE : m >= w - P && m <= w ? v >= 0 && v <= P ? y.TR : v >= b - P && v <= b ? y.BR : v > P && v < b - P ? y.R : y.NONE : y.NONE,
                    {
                        isInsidePage: m >= 0 && m <= w && v >= 0 && v <= b,
                        isInside: h !== y.NONE && h !== y.L && h !== y.R,
                        x: d,
                        y: u,
                        fullWidth: r,
                        rawDistance: r - d,
                        distance: p,
                        page: g,
                        drag: f,
                        foldSense: this.foldSense,
                        event: n,
                        raw: l,
                        corner: h
                    }
            }
            ,
            l.prototype.gotoPage = function (e) {
                e = parseInt(e, 10),
                    this._activePage = e,
                1 == this.autoPlay && this.previewObject.setAutoPlay(this.autoPlay),
                    this.updatePage(e)
            }
            ,
            l.prototype.refresh = function () {
                this.updatePage(this._activePage),
                null != this.flipCallback && this.flipCallback()
            }
            ,
            l.prototype.updatePage = function (n) {
                var o = this.direction == e.DIRECTION.RTL
                    , a = I(this)
                    , r = (E(n),
                    a ? 1 : 2);
                n = Math.floor(n / r),
                o && (n = this.pageCount / r - n);
                var s = this.oldBaseNumber || 0
                    , l = this.pageCount / r
                    , d = this.stackCount
                    , u = Math.floor(d / 2);
                s > n ? (this.children[d - 1].skipFlip = !0,
                    this.children.unshift(this.children.pop())) : s < n && (this.children[0].skipFlip = !0,
                    this.children.push(this.children.shift()));
                for (var h = 0; h < d; h++) {
                    var p = this.children[h];
                    s !== n && null != p.currentTween && p.clearTween(!0);
                    var g, f = p.side, m = n - u + h;
                    o && (m = a ? this.pageCount - m : Math.floor(this.pageCount / 2) - m - 1);
                    var v = p.name;
                    p.isHard = this.isPageHard(m),
                        p.isHard ? p.element.addClass("df-hard-page") : (p.element.removeClass("df-hard-page"),
                            p.front.css({
                                display: "block"
                            }),
                            p.back.css({
                                display: "block"
                            })),
                        0 == m || m == l ? p.element.addClass("df-cover-page") : p.element.removeClass("df-cover-page"),
                    t(p.element).attr("pageNumber") != m && (p.front.contentLayer.empty(),
                        p.back.contentLayer.empty()),
                        t(p.element).attr("pageNumber", m),
                        p.isEdge = !1,
                    0 == h || h == d - 1 || (p.isEdge = !1),
                        g = h < u ? c.left : c.right,
                    0 == p.isFlipping && (g !== f && 0 == p.skipFlip ? (this.animatePage(p),
                    null != this.preFlipCallback && this.preFlipCallback()) : (p.skipFlip = !1,
                        p.element.removeClass("df-flipping df-quick-turn df-folding df-left-side df-right-side"),
                        p.element.addClass(h < u ? "df-left-side" : "df-right-side"),
                        p.side = g)),
                        p.visible = a ? o ? h < u || p.isFlipping : h >= u || p.isFlipping : m >= 0 && m < l || a && m == l,
                        p.name = m.toString(),
                    null != this.requestPage && 1 == p.visible && p.name != v && (p.backTextureLoaded = !1,
                        p.frontTextureLoaded = !1,
                        p.backPageStamp = "-1",
                        p.frontPageStamp = "-1",
                        p.thumbLoaded = !1,
                        p.front.contentLayer.html(""),
                        p.back.contentLayer.html(""),
                        p.frontImage(i.textureLoadFallback),
                        p.backImage(i.textureLoadFallback),
                        this.requestPage()),
                        p.oldDepth = p.depth,
                        p.updateCSS({
                            display: 1 == p.visible ? "block" : "none",
                            zIndex: 6 + (h < u ? h - u : u - h),
                            transform: ""
                        }),
                    null == p.pendingPoint && 0 == p.isFlipping && p.resetCSS()
                }
                0 == TWEEN.getAll().length && clearInterval(this.animate),
                    t(".quick-hint").html(n),
                    this.oldBaseNumber = n,
                this.updatePageCallback && this.updatePageCallback()
            }
            ,
            l.prototype.animatePage = function (e) {
                e.element.addClass("df-flipping"),
                    e.isFlipping = !0,
                null != this.animate && clearInterval(this.animate),
                    this.animate = setInterval(this.animateF, 30),
                    e.tween(e.pendingPoint)
            }
            ,
            l
    }({})
        , W = function (o) {
        function a(n, i, a) {
            o.call(this, a);
            var s = this;
            s.type = "album",
                s.container = n,
                s.options = a,
                s.options.source = i,
                s.contentSource = i,
                null != a.height && a.height.toString().indexOf("%") < 0 ? s.container.height(Math.min(a.height, t(window).height())) : s.container.height(a.height),
            s.options.isLightBox && window.dfLightBox.closeButton.addClass(s.options.icons.close),
            s.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL && ((Array === s.contentSource.constructor || Array.isArray(s.contentSource) || s.contentSource instanceof Array) && (s.options.singlePageMode = e.SINGLE_PAGE_MODE.ZOOM),
                s.container.addClass("df-double-internal")),
            s.options.isLightBox || null == s.container.attr("id") || (s.options.id = s.container.attr("id")),
            !0 !== s.options.parsed && null != s.options.links && e.parseLinks(s.options.links);
            var l = s.webgl = 1 == a.webgl && 1 == M;
            if (n.addClass("df-container df-loading df-init df-floating df-controls-" + s.options.controlsPosition),
            1 == s.options.transparent && n.addClass("df-transparent"),
            s.options.direction == e.DIRECTION.RTL && n.addClass("df-rtl"),
                s.container.info = t(u.div, {
                    class: "loading-info"
                }).appendTo(s.container).html("Carregando..."),
            (-1 !== r.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > 0 || F && !B) && (s.options.webgl = !1),
                r.match(/msie\s[5-9]/i))
                return s.container.info.html("Seu navegador está desatualizado. <br><a href='https://browsehappy.com/'>Verifique um melhor.</a>").addClass("df-old-browser"),
                    n.removeClass("df-loading"),
                    s;
            var c = null == a.backgroundImage || "" == a.backgroundImage ? "" : "url('" + a.backgroundImage + "')";
            return s.container.css({
                position: "relative",
                overflow: "hidden",
                backgroundColor: a.backgroundColor,
                backgroundImage: c
            }),
                s.init(l, i),
            null != s.options.onCreate && s.options.onCreate(s),
                s
        }

        return D(a, o),
            a.prototype.init = function (o) {
                var a = this
                    , r = a.target
                    , s = a.options;
                if (1 == o) {
                    !function (t) {
                        var o = function () {
                            MOCKUP.defaults.anisotropy = 0,
                                MOCKUP.defaults.groundTexture = "BLACK",
                                THREE.skipPowerOfTwo = !0,
                                n(),
                            null != t && t()
                        };
                        null == window.MOCKUP ? (a.updateInfo("Carregando Álbum..."),
                            L(i.threejsSrc + "?ver=" + e.version, function () {
                                L(i.mockupjsSrc + "?ver=" + e.version, function () {
                                    o()
                                })
                            })) : o()
                    }(function () {
                        a.container.css({
                            minHeight: 300,
                            minWidth: 300
                        }),
                            a.stage = new A(x(a.options, {
                                container: a.container
                            })),
                            a.stage.previewObject = a,
                            a.contentProvider = new j(a.contentSource, function (n) {
                                    console.log();
                                    var i = {
                                        pageCount: n.pageCount,
                                        stackCount: 52,
                                        segments: 1,
                                        width: n.bookSize.width,
                                        height: n.bookSize.height
                                    };
                                    a.checkOpenPage(),
                                        a.target = r = a.stage.target = new MOCKUP.Book(x(a.options, i), a.stage),
                                        a.extendtarget(),
                                        N(a.container, a),
                                        r.ui = a.ui,
                                        r.container = a.container,
                                        n.webgl = o,
                                        n.setTarget(a.target),
                                        r.getContentLayer = function (t) {
                                            var n = r.direction == e.DIRECTION.RTL
                                                , i = a.stage.cssScene.divLeft.element
                                                , o = a.stage.cssScene.divRight.element;
                                            E(r._activePage);
                                            return I(r) ? n ? i : o : t % 2 == 0 ? n ? o : i : n ? i : o
                                        }
                                        ,
                                        r.stage = a.stage,
                                        r.flipCallback = function () {
                                            if (a.contentProvider) {
                                                a.contentProvider.review("flipCallback");
                                                var n, i, o = E(r._activePage), s = r.getPageByNumber(o),
                                                    l = r.getPageByNumber(o + 1), c = r.parent.cssScene.divLeft,
                                                    d = r.parent.cssScene.divRight;
                                                r.pageMode,
                                                    e.PAGE_MODE.SINGLE,
                                                    r.direction,
                                                    e.DIRECTION.RTL;
                                                null != s && null != c && (n = Math.abs(s.geometry.boundingBox.max.x - s.geometry.boundingBox.min.x),
                                                    i = Math.abs(s.geometry.boundingBox.max.z - s.geometry.boundingBox.min.z),
                                                    c.rotation.y = .9 * -Math.atan2(i, n),
                                                    c.position.z = .8 * i,
                                                    c.position.x = i / 2.5,
                                                    t(c.element).css({
                                                        width: n,
                                                        left: -n / 2
                                                    })),
                                                null != l && null != d && (n = Math.abs(l.geometry.boundingBox.max.x - l.geometry.boundingBox.min.x),
                                                    i = Math.abs(l.geometry.boundingBox.max.z - l.geometry.boundingBox.min.z),
                                                    d.rotation.y = .9 * Math.atan2(i, n),
                                                    d.position.z = .8 * i,
                                                    d.position.x = -i / 2.5,
                                                    t(d.element).css({
                                                        width: n,
                                                        left: n / 2
                                                    })),
                                                null != a.options.onFlip && a.options.onFlip(a)
                                            }
                                        }
                                        ,
                                        r.resize = void a.resize(),
                                        r.updatePageCallback = function () {
                                            a.ui.update(),
                                                a.checkCenter(),
                                                a.stage.renderRequestPending = !0
                                        }
                                    ;
                                    var s = t(a.stage.cssScene.divLeft.element)
                                        , l = t(a.stage.cssScene.divRight.element);
                                    r.preFlipCallback = function () {
                                        s.empty(),
                                            l.empty(),
                                        null != a.options.beforeFlip && a.options.beforeFlip(a),
                                            a.playSound()
                                    }
                                        ,
                                        t(window).trigger("resize"),
                                        s.css({
                                            width: n.bookSize.width,
                                            height: n.bookSize.height,
                                            left: -n.bookSize.width / 2
                                        }),
                                        l.css({
                                            width: n.bookSize.width,
                                            height: n.bookSize.height,
                                            left: n.bookSize.width / 2
                                        }),
                                        r.ease = TWEEN.Easing.Cubic.InOut,
                                        r.contentProvider = n,
                                        r.duration = a.options.duration,
                                        r.gotoPage(r._activePage),
                                        r.flipCallback(),
                                    null != a.options.onReady && a.options.onReady(a)
                                }
                                , s, a)
                    })
                } else
                    a.contentProvider = new j(a.contentSource, function (e) {
                            var n = {
                                pageCount: e.pageCount,
                                contentSourceType: e.contentSourceType
                            };
                            a.checkOpenPage(),
                                a.target = r = new H(x(a.options, n), a.container),
                                a.target.previewObject = a,
                                a.extendtarget(),
                                N(a.container, a),
                                e.webgl = o,
                                e.setTarget(a.target),
                                e.waitPeriod = 2,
                                r.ease = TWEEN.Easing.Quadratic.InOut,
                                r.duration = a.options.duration,
                                r.container = a.container,
                                r.updatePageCallback = function () {
                                    a.ui.update(),
                                        a.checkCenter()
                                }
                                ,
                                r.resize = void a.resize(),
                                t(window).trigger("resize"),
                                r.flipCallback = function () {
                                    a.contentProvider && (a.contentProvider.review("flipCallback"),
                                    null != a.options.onFlip && a.options.onFlip(a))
                                }
                                ,
                                r.preFlipCallback = function () {
                                    null != a.options.beforeFlip && a.options.beforeFlip(a),
                                        a.playSound()
                                }
                                ,
                                r.gotoPage(r._activePage),
                                r.flipCallback(),
                            null != a.options.onReady && a.options.onReady(a)
                        }
                        , s, a)
            }
            ,
            a.prototype.extendtarget = function () {
                var e = this;
                e.target.previewObject = e,
                    e.target.reset = function () {
                        for (var t = 0; t < e.target.children.length; t++) {
                            var n = e.target.children[t];
                            n.skipFlip = !0,
                                n.name = "-2"
                        }
                        e.contentProvider.annotedPage = "-2",
                            e.target.refresh()
                    }
            }
            ,
            a.prototype.getURLHash = function () {
                if (null != this.options.id) {
                    var e = "flip" + (null != this.options.slug ? this.options.slug : this.options.id) + "/";
                    null != this.target && null != this.target._activePage && (e += this.target._activePage + "/"),
                        window.location.hash = e
                }
                return window.location.href
            }
            ,
            a.prototype.checkOpenPage = function () {
                if (null != this.options.id) {
                    var e = t("#" + this.options.id);
                    if (e.length > 0 && null != e.data("page")) {
                        var n = parseInt(e.data("page"), 10);
                        isNaN(n) || (this.options.openPage = n)
                    }
                }
            }
            ,
            a.prototype.end = function () {
                this.target.gotoPage(this.target.endPage)
            }
            ,
            a.prototype.gotoPage = function (e) {
                this.target.gotoPage(e),
                null != this.ui && this.ui.update()
            }
            ,
            a.prototype.prev = function () {
                this.target.prev()
            }
            ,
            a.prototype.next = function () {
                this.target.next()
            }
            ,
            a.prototype.updateInfo = function (e) {
                this.container && this.container.info && this.container.info.html && this.container.info.html(e)
            }
            ,
            a
    }(_);
    t.fn.extend({
        shelf: function () {
        },
        simAlbum: function (e, n) {
            return new W(t(this), e, z(n))
        }
    })
}(FLIPBOOKPROCOM, jQuery),
    function (e) {
        if (e.URL = e.URL || e.webkitURL,
        e.Blob && e.URL)
            try {
                return void new Blob
            } catch (e) {
            }
        var t = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || function (e) {
            var t = function (e) {
                    return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]
                }
                , n = function () {
                    this.data = []
                }
                , i = function (e, t, n) {
                    this.data = e,
                        this.size = e.length,
                        this.type = t,
                        this.encoding = n
                }
                , o = n.prototype
                , a = i.prototype
                , r = e.FileReaderSync
                , s = function (e) {
                    this.code = this[this.name = e]
                }
                ,
                l = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" ")
                , c = l.length
                , d = e.URL || e.webkitURL || e
                , u = d.createObjectURL
                , h = d.revokeObjectURL
                , p = d
                , g = e.btoa
                , f = e.atob
                , m = e.ArrayBuffer
                , v = e.Uint8Array
                , b = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
            for (i.fake = a.fake = !0; c--;)
                s.prototype[l[c]] = c + 1;
            return d.createObjectURL || (p = e.URL = function (e) {
                    var t, n = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                    return n.href = e,
                    "origin" in n || ("data:" === n.protocol.toLowerCase() ? n.origin = null : (t = e.match(b),
                        n.origin = t && t[1])),
                        n
                }
            ),
                p.createObjectURL = function (e) {
                    var t, n = e.type;
                    return null === n && (n = "application/octet-stream"),
                        e instanceof i ? (t = "data:" + n,
                            "base64" === e.encoding ? t + ";base64," + e.data : "URI" === e.encoding ? t + "," + decodeURIComponent(e.data) : g ? t + ";base64," + g(e.data) : t + "," + encodeURIComponent(e.data)) : u ? u.call(d, e) : void 0
                }
                ,
                p.revokeObjectURL = function (e) {
                    "data:" !== e.substring(0, 5) && h && h.call(d, e)
                }
                ,
                o.append = function (e) {
                    var n = this.data;
                    if (v && (e instanceof m || e instanceof v)) {
                        for (var o = "", a = new v(e), l = 0, c = a.length; l < c; l++)
                            o += String.fromCharCode(a[l]);
                        n.push(o)
                    } else if ("Blob" === t(e) || "File" === t(e)) {
                        if (!r)
                            throw new s("NOT_READABLE_ERR");
                        var d = new r;
                        n.push(d.readAsBinaryString(e))
                    } else
                        e instanceof i ? "base64" === e.encoding && f ? n.push(f(e.data)) : "URI" === e.encoding ? n.push(decodeURIComponent(e.data)) : "raw" === e.encoding && n.push(e.data) : ("string" != typeof e && (e += ""),
                            n.push(unescape(encodeURIComponent(e))))
                }
                ,
                o.getBlob = function (e) {
                    return arguments.length || (e = null),
                        new i(this.data.join(""), e, "raw")
                }
                ,
                o.toString = function () {
                    return "[object BlobBuilder]"
                }
                ,
                a.slice = function (e, t, n) {
                    var o = arguments.length;
                    return o < 3 && (n = null),
                        new i(this.data.slice(e, o > 1 ? t : this.data.length), n, this.encoding)
                }
                ,
                a.toString = function () {
                    return "[object Blob]"
                }
                ,
                a.close = function () {
                    this.size = 0,
                        delete this.data
                }
                ,
                n
        }(e);
        e.Blob = function (e, n) {
            var i = n ? n.type || "" : ""
                , o = new t;
            if (e)
                for (var a = 0, r = e.length; a < r; a++)
                    Uint8Array && e[a] instanceof Uint8Array ? o.append(e[a].buffer) : o.append(e[a]);
            var s = o.getBlob(i);
            return !s.slice && s.webkitSlice && (s.slice = s.webkitSlice),
                s
        }
        ;
        var n = Object.getPrototypeOf || function (e) {
                return e.__proto__
            }
        ;
        e.Blob.prototype = n(new e.Blob)
    }(window),
    function (e) {
        var t, n = e.Uint8Array, i = e.HTMLCanvasElement, o = i && i.prototype, a = /\s*;\s*base64\s*(?:;|$)/i,
            r = "toDataURL", s = function (e) {
                for (var i, o, a = e.length, r = new n(a / 4 * 3 | 0), s = 0, l = 0, c = [0, 0], d = 0, u = 0; a--;)
                    o = e.charCodeAt(s++),
                    255 !== (i = t[o - 43]) && null != i && (c[1] = c[0],
                        c[0] = o,
                        u = u << 6 | i,
                    4 === ++d && (r[l++] = u >>> 16,
                    61 !== c[1] && (r[l++] = u >>> 8),
                    61 !== c[0] && (r[l++] = u),
                        d = 0));
                return r
            };
        n && (t = new n([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])),
        i && !o.toBlob && (o.toBlob = function (e, t) {
            if (t || (t = "image/png"),
                this.mozGetAsFile)
                e(this.mozGetAsFile("canvas", t));
            else if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(t))
                e(this.msToBlob());
            else {
                var i, o = Array.prototype.slice.call(arguments, 1), l = this[r].apply(this, o), c = l.indexOf(","),
                    d = l.substring(c + 1), u = a.test(l.substring(0, c));
                Blob.fake ? ((i = new Blob).encoding = u ? "base64" : "URI",
                    i.data = d,
                    i.size = d.length) : n && (i = u ? new Blob([s(d)], {
                    type: t
                }) : new Blob([decodeURIComponent(d)], {
                    type: t
                })),
                    e(i)
            }
        }
            ,
            o.toDataURLHD ? o.toBlobHD = function () {
                    r = "toDataURLHD";
                    var e = this.toBlob();
                    return r = "toDataURL",
                        e
                }
                : o.toBlobHD = o.toBlob)
    }(window),
    function () {
        if ("performance" in window == !1 && (window.performance = {}),
            Date.now = Date.now || function () {
                return (new Date).getTime()
            }
            ,
        "now" in window.performance == !1) {
            var e = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart : Date.now();
            window.performance.now = function () {
                return Date.now() - e
            }
        }
    }(),
    function () {
        var e = e || function () {
            var e = [];
            return {
                getAll: function () {
                    return e
                },
                removeAll: function () {
                    e = []
                },
                add: function (t) {
                    e.push(t)
                },
                remove: function (t) {
                    var n = e.indexOf(t);
                    -1 !== n && e.splice(n, 1)
                },
                update: function (t) {
                    if (0 === e.length)
                        return !1;
                    var n = 0;
                    for (t = null != t ? t : window.performance.now(); n < e.length;)
                        e[n].update(t) ? n++ : e.splice(n, 1);
                    return !0
                }
            }
        }();
        e.Tween = function (t) {
            var n = t
                , i = {}
                , o = {}
                , a = {}
                , r = 1e3
                , s = 0
                , l = !1
                , c = !1
                , d = !1
                , u = 0
                , h = null
                , p = e.Easing.Linear.None
                , g = e.Interpolation.Linear
                , f = []
                , m = null
                , v = !1
                , b = null
                , w = null
                , P = null;
            for (var y in t)
                i[y] = parseFloat(t[y], 10);
            this.to = function (e, t) {
                return null != t && (r = t),
                    o = e,
                    this
            }
                ,
                this.start = function (t) {
                    e.add(this),
                        c = !0,
                        v = !1,
                        h = null != t ? t : window.performance.now(),
                        h += u;
                    for (var r in o) {
                        if (o[r] instanceof Array) {
                            if (0 === o[r].length)
                                continue;
                            o[r] = [n[r]].concat(o[r])
                        }
                        null !== i[r] && (i[r] = n[r],
                        i[r] instanceof Array == !1 && (i[r] *= 1),
                            a[r] = i[r] || 0)
                    }
                    return this
                }
                ,
                this.stop = function () {
                    return c ? (e.remove(this),
                        c = !1,
                    null !== P && P.call(n),
                        this.stopChainedTweens(),
                        this) : this
                }
                ,
                this.stopChainedTweens = function () {
                    for (var e = 0, t = f.length; e < t; e++)
                        f[e].stop()
                }
                ,
                this.complete = function () {
                    return c ? (e.remove(this),
                        c = !1,
                    null !== w && w.call(n),
                        this.completeChainedTweens(),
                        this) : this
                }
                ,
                this.completeChainedTweens = function () {
                    for (var e = 0, t = f.length; e < t; e++)
                        f[e].complete()
                }
                ,
                this.delay = function (e) {
                    return u = e,
                        this
                }
                ,
                this.repeat = function (e) {
                    return s = e,
                        this
                }
                ,
                this.yoyo = function (e) {
                    return l = e,
                        this
                }
                ,
                this.easing = function (e) {
                    return p = null == e ? p : e,
                        this
                }
                ,
                this.interpolation = function (e) {
                    return g = e,
                        this
                }
                ,
                this.chain = function () {
                    return f = arguments,
                        this
                }
                ,
                this.onStart = function (e) {
                    return m = e,
                        this
                }
                ,
                this.onUpdate = function (e) {
                    return b = e,
                        this
                }
                ,
                this.onComplete = function (e) {
                    return w = e,
                        this
                }
                ,
                this.onStop = function (e) {
                    return P = e,
                        this
                }
                ,
                this.update = function (e) {
                    var t, c, P;
                    if (e < h)
                        return !0;
                    !1 === v && (null !== m && m.call(n),
                        v = !0),
                        P = p(c = (c = (e - h) / r) > 1 ? 1 : c);
                    for (t in o)
                        if (null !== i[t]) {
                            var y = i[t] || 0
                                , O = o[t];
                            O instanceof Array ? n[t] = g(O, P) : ("string" == typeof O && (O = O.startsWith("+") || O.startsWith("-") ? y + parseFloat(O, 10) : parseFloat(O, 10)),
                            "number" == typeof O && (n[t] = y + (O - y) * P))
                        }
                    if (null !== b && b.call(n, P),
                    1 === c) {
                        if (s > 0) {
                            isFinite(s) && s--;
                            for (t in a) {
                                if ("string" == typeof o[t] && (a[t] = a[t] + parseFloat(o[t], 10)),
                                    l) {
                                    var C = a[t];
                                    a[t] = o[t],
                                        o[t] = C
                                }
                                i[t] = a[t]
                            }
                            return l && (d = !d),
                                h = e + u,
                                !0
                        }
                        null !== w && w.call(n);
                        for (var x = 0, E = f.length; x < E; x++)
                            f[x].start(h + r);
                        return !1
                    }
                    return !0
                }
        }
            ,
            e.Easing = {
                Linear: {
                    None: function (e) {
                        return e
                    }
                },
                Quadratic: {
                    In: function (e) {
                        return e * e
                    },
                    Out: function (e) {
                        return e * (2 - e)
                    },
                    InOut: function (e) {
                        return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
                    }
                },
                Quartic: {
                    In: function (e) {
                        return e * e * e * e
                    },
                    Out: function (e) {
                        return 1 - --e * e * e * e
                    },
                    InOut: function (e) {
                        return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
                    }
                },
                Sinusoidal: {
                    In: function (e) {
                        return 1 - Math.cos(e * Math.PI / 2)
                    },
                    Out: function (e) {
                        return Math.sin(e * Math.PI / 2)
                    },
                    InOut: function (e) {
                        return .5 * (1 - Math.cos(Math.PI * e))
                    }
                },
                Cubic: {
                    In: function (e) {
                        return e * e * e
                    },
                    Out: function (e) {
                        return --e * e * e + 1
                    },
                    InOut: function (e) {
                        return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
                    }
                }
            },
            e.Interpolation = {
                Linear: function (t, n) {
                    var i = t.length - 1
                        , o = i * n
                        , a = Math.floor(o)
                        , r = e.Interpolation.Utils.Linear;
                    return n < 0 ? r(t[0], t[1], o) : n > 1 ? r(t[i], t[i - 1], i - o) : r(t[a], t[a + 1 > i ? i : a + 1], o - a)
                },
                Bezier: function (t, n) {
                    for (var i = 0, o = t.length - 1, a = Math.pow, r = e.Interpolation.Utils.Bernstein, s = 0; s <= o; s++)
                        i += a(1 - n, o - s) * a(n, s) * t[s] * r(o, s);
                    return i
                },
                Utils: {
                    Linear: function (e, t, n) {
                        return (t - e) * n + e
                    },
                    Bernstein: function (t, n) {
                        var i = e.Interpolation.Utils.Factorial;
                        return i(t) / i(n) / i(t - n)
                    },
                    Factorial: function () {
                        var e = [1];
                        return function (t) {
                            var n = 1;
                            if (e[t])
                                return e[t];
                            for (var i = t; i > 1; i--)
                                n *= i;
                            return e[t] = n,
                                n
                        }
                    }(),
                    CatmullRom: function (e, t, n, i, o) {
                        var a = .5 * (n - e)
                            , r = .5 * (i - t)
                            , s = o * o;
                        return (2 * t - 2 * n + a + r) * (o * s) + (-3 * t + 3 * n - 2 * a - r) * s + a * o + t
                    }
                }
            },
            window.TWEEN = e
    }(),
    FLIPBOOKPROCOM.createBlob = function (e, t) {
        if ("undefined" != typeof Blob)
            return new Blob([e], {
                type: t
            });
        var n = new MozBlobBuilder;
        return n.append(e),
            n.getBlob(t)
    },
    FLIPBOOKPROCOM.createObjectURL = function () {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return function (t, n) {
            if ("undefined" != typeof URL && URL.createObjectURL) {
                var i = FLIPBOOKPROCOM.createBlob(t, n);
                return URL.createObjectURL(i)
            }
            for (var o = "data:" + n + ";base64,", a = 0, r = t.length; a < r; a += 3) {
                var s = 255 & t[a]
                    , l = 255 & t[a + 1]
                    , c = 255 & t[a + 2]
                    , d = s >> 2
                    , u = (3 & s) << 4 | l >> 4
                    , h = a + 1 < r ? (15 & l) << 2 | c >> 6 : 64
                    , p = a + 2 < r ? 63 & c : 64;
                o += e[d] + e[u] + e[h] + e[p]
            }
            return o
        }
    }();
var ThumbList = function () {
    function e(t) {
        function n(e) {
            var t = e.target.scrollTop;
            if (!s.lastRepaintY || Math.abs(t - s.lastRepaintY) >= s.offsetItems * s.itemHeight) {
                var n = parseInt(t / a, 10) - s.offsetItems;
                s._renderChunk(s.container, n < 0 ? 0 : n),
                    s.lastRepaintY = t
            }
            s.lastScrolled = l = Date.now(),
            null != s.scrollFn && s.scrollFn(),
            e.preventDefault && e.preventDefault()
        }

        var i = t && t.w + "px" || "100%"
            , o = t && t.h + "px" || "100%"
            , a = this.itemHeight = t.itemHeight;
        this.items = t.items,
            this.generatorFn = t.generatorFn,
            this.totalRows = t.totalRows || t.items && t.items.length,
            this.addFn = t.addFn,
            this.scrollFn = t.scrollFn;
        var r = e.createScroller(a * this.totalRows);
        this.container = e.createContainer(i, o),
            this.container.appendChild(r),
            this.screenItemsLen = Math.ceil(t.h / a),
            this.offsetItems = this.screenItemsLen,
            this.cachedItemsLen = this.screenItemsLen + 2 * this.offsetItems,
            this._renderChunk(this.container, 0);
        var s = this;
        s.lastRepaintY = 0;
        this.screenItemsLen;
        var l = 0;
        s.dispose = function () {
            s.container && s.container.parentNode && s.container.parentNode.removeChild(s.container),
                s.container.removeEventListener("scroll", n)
        }
            ,
            s.container.addEventListener("scroll", n)
    }
    return e.prototype.reset = function (e) {
        this.screenItemsLen = Math.ceil(e / this.itemHeight),
            this.cachedItemsLen = this.screenItemsLen + 2 * this.offsetItems;
        var t = parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
        this.needReset = !0,
            this._renderChunk(this.container, Math.max(t, 0))
    }
        ,
        e.prototype.createRow = function (e) {
            var t;
            return this.generatorFn && ((t = this.generatorFn(e)).classList.add("df-vrow"),
                t.style.position = "absolute",
                t.style.top = e * this.itemHeight + "px",
                t.setAttribute("index", e)),
                t
        }
        ,
        e.prototype._renderChunk = function (e, t) {
            var n = null == this.range;
            this.range = this.range || {
                min: 0,
                max: this.cachedItemsLen
            };
            var i = this.range
                , o = i.min
                , a = i.max
                , r = !!n || t >= o;
            if (n || t != o || 0 != this.needReset) {
                var s, l = n ? o : r ? a : t;
                l = l > this.totalRows ? this.totalRows : l < 0 ? 0 : l;
                var c = t + this.cachedItemsLen;
                for (c = c > this.totalRows ? this.totalRows : c,
                         s = l; s < c; s++)
                    r ? e.appendChild(this.createRow(s)) : e.insertBefore(this.createRow(s), e.childNodes[1 + s - l]),
                    null != this.addFn && this.addFn(s);
                Math.abs(t - o);
                if (this.needReset = !1,
                !n && e.childNodes.length > this.cachedItemsLen + 1)
                    for (var d = r ? 1 : 1 + this.cachedItemsLen, u = d + (c - l); u > d; u--)
                        e.childNodes[d] && this.container.removeChild(e.childNodes[d]);
                this.range.min = t,
                    this.range.max = c
            }
        }
        ,
        e.createContainer = function (e, t) {
            var n = document.createElement("div");
            return n.style.width = e,
                n.style.height = t,
                n.style.overflow = "auto",
                n.style.position = "relative",
                n.style.padding = 0,
                n
        }
        ,
        e.createScroller = function (e) {
            var t = document.createElement("div");
            return t.style.opacity = 0,
                t.style.position = "absolute",
                t.style.top = 0,
                t.style.left = 0,
                t.style.width = "1px",
                t.style.height = e + "px",
                t
        }
        ,
        e
}(),
    BookMarkViewer = function () {
    function e(e) {
        this.outline = null,
            this.lastToggleIsShow = !0,
            this.container = e.container,
            this.linkService = e.linkService,
            this.outlineItemClass = e.outlineItemClass || "outlineItem",
            this.outlineToggleClass = e.outlineToggleClass || "outlineItemToggler",
            this.outlineToggleHiddenClass = e.outlineToggleHiddenClass || "outlineItemsHidden"
    }

    return e.prototype = {
        dispose: function () {
            this.container && this.container.parentNode && this.container.parentNode.removeChild(this.container),
                this.linkService = null
        },
        reset: function () {
            this.outline = null,
                this.lastToggleIsShow = !0;
            for (var e = this.container; e.firstChild;)
                e.removeChild(e.firstChild)
        },
        _dispatchEvent: function (e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("outlineloaded", !0, !0, {
                outlineCount: e
            }),
                this.container.dispatchEvent(t)
        },
        _bindLink: function (e, t) {
            var n = this.linkService;
            if (1 == t.custom)
                e.href = n.getCustomDestinationHash(t.dest),
                    e.onclick = function (e) {
                        return n.customNavigateTo(t.dest),
                            !1
                    }
                ;
            else {
                if (t.url)
                    return void PDFJS.addLinkAttributes(e, {
                        url: t.url
                    });
                e.href = n.getDestinationHash(t.dest),
                    e.onclick = function (e) {
                        return n.navigateTo(t.dest),
                            !1
                    }
            }
        },
        _addToggleButton: function (e) {
            var t = document.createElement("div");
            t.className = this.outlineToggleClass + " " + this.outlineToggleHiddenClass,
                t.onclick = function (n) {
                    if (n.stopPropagation(),
                        t.classList.toggle(this.outlineToggleHiddenClass),
                        n.shiftKey) {
                        var i = !t.classList.contains(this.outlineToggleHiddenClass);
                        this._toggleOutlineItem(e, i)
                    }
                }
                    .bind(this),
                e.insertBefore(t, e.firstChild)
        },
        _toggleOutlineItem: function (e, t) {
            this.lastToggleIsShow = t;
            for (var n = e.querySelectorAll("." + this.outlineToggleClass), i = 0, o = n.length; i < o; ++i)
                n[i].classList[t ? "remove" : "add"](this.outlineToggleHiddenClass)
        },
        toggleOutlineTree: function () {
            this.outline && this._toggleOutlineItem(this.container, !this.lastToggleIsShow)
        },
        render: function (e) {
            var t = e && e.outline || null
                , n = 0;
            if (this.outline && this.reset(),
                this.outline = t,
                t) {
                for (var i = document.createDocumentFragment(), o = [{
                    parent: i,
                    items: this.outline
                }], a = !1; o.length > 0;)
                    for (var r = o.shift(), s = r.custom, l = 0, c = r.items.length; l < c; l++) {
                        var d = r.items[l]
                            , u = document.createElement("div");
                        u.className = this.outlineItemClass;
                        var h = document.createElement("a");
                        if (null == d.custom && null != s && (d.custom = s),
                            this._bindLink(h, d),
                            h.textContent = d.title.replace(/\x00/g, ""),
                            u.appendChild(h),
                        d.items && d.items.length > 0) {
                            a = !0,
                                this._addToggleButton(u);
                            var p = document.createElement("div");
                            p.className = this.outlineItemClass + "s",
                                u.appendChild(p),
                                o.push({
                                    parent: p,
                                    custom: d.custom,
                                    items: d.items
                                })
                        }
                        r.parent.appendChild(u),
                            n++
                    }
                a && (null != this.container.classList ? this.container.classList.add(this.outlineItemClass + "s") : null != this.container.className && (this.container.className += " picWindow")),
                    this.container.appendChild(i),
                    this._dispatchEvent(n)
            }
        }
    },
        e
}(), DFLightBox = function (e) {
    function t(t, n) {
        this.duration = 300;
        var i = this;
        return i.lightboxWrapper = e("<div>").addClass("df-lightbox-wrapper"),
            i.container = e("<div>").addClass("df-container").appendTo(i.lightboxWrapper),
            i.controls = e("<div>").addClass("df-lightbox-controls").appendTo(i.lightboxWrapper),
            i.closeButton = e("<div>").addClass("df-lightbox-close df-ui-btn").on("click", function () {
                i.close(t)
            }).appendTo(i.controls),
            i.lightboxWrapper.append(i.container),
            i
    }

    return t.prototype.show = function (t) {
        return 0 == this.lightboxWrapper.parent().length && e("body").append(this.lightboxWrapper),
            this.lightboxWrapper.fadeIn(this.duration, t),
            this
    }
        ,
        t.prototype.close = function (e) {
            return this.lightboxWrapper.fadeOut(this.duration),
                setTimeout(e, this.duration),
                this
        }
        ,
        t
}(jQuery);
FLIPBOOKPROCOM.Share = function (e) {
    function t(t, n) {
        var i = this;
        i.isOpen = !1,
            i.shareUrl = "",
            i.wrapper = e('<div class="df-share-wrapper" style="display: none;">').on("click", function (e) {
                i.close()
            }),
            i.box = e('<div class="df-share-box">').on("click", function (e) {
                e.preventDefault(),
                    e.stopPropagation()
            }).appendTo(i.wrapper).html('<span class="df-share-title">' + n.text.share + "</span>"),
            i.urlInput = e('<textarea class="df-share-url">').on("click", function () {
                e(this).select()
            }),
            i.facebook = e("<div>", {
                class: "df-share-button df-share-facebook " + n.icons.facebook
            }).on("click", function (e) {
                window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(i.shareUrl), "Sharer", "width=500,height=400")
            }),
            i.google = e("<div>", {
                class: "df-share-button df-share-google " + n.icons.google
            }).on("click", function (e) {
                window.open("https://plus.google.com/share?url=" + encodeURIComponent(i.shareUrl), "Sharer", "width=500,height=400")
            }),
            i.twitter = e("<div>", {
                class: "df-share-button df-share-twitter " + n.icons.twitter
            }).on("click", function (e) {
                window.open("http://twitter.com/share?url=" + encodeURIComponent(i.shareUrl), "Sharer", "width=500,height=400")
            }),
            i.mail = e("<a>", {
                class: "df-share-button df-share-mail " + n.icons.mail,
                href: "mailto:?subject=Veja esse Album&body=Atráves do site " + encodeURIComponent(i.shareUrl),
                target: "_blank"
            }).on("click", function (t) {
                e(this).attr("href", "mailto:?subject=Veja esse album&body=Atráves do site " + encodeURIComponent(i.shareUrl)),
                    t.stopPropagation()
            }),
            i.box.append(i.urlInput).append(i.facebook).append(i.google).append(i.twitter).append(i.mail),
            e(t).append(i.wrapper)
    }

    return t.prototype.show = function () {
        this.wrapper.fadeIn(300),
            this.urlInput.val(this.shareUrl),
            this.urlInput.trigger("click"),
            this.isOpen = !0
    }
        ,
        t.prototype.dispose = function () {
            var e = this;
            e.box.off(),
                e.google.off(),
                e.twitter.off(),
                e.facebook.off(),
                e.mail.off(),
                e.urlInput.off(),
                e.wrapper.off().remove()
        }
        ,
        t.prototype.close = function () {
            this.wrapper.fadeOut(300),
                this.isOpen = !1
        }
        ,
        t.prototype.update = function (e) {
            this.shareUrl = e
        }
        ,
        t
}(jQuery),
    FLIPBOOKPROCOM.Popup = function (e) {
        function t(t, n) {
            var i = this;
            i.isOpen = !1,
                i.wrapper = e('<div class="df-popup-wrapper" style="display: none;">').on("click", function (e) {
                    i.close()
                }),
                i.box = e('<div class="df-popup-box">').on("click", function (e) {
                    e.preventDefault(),
                        e.stopPropagation()
                }).appendTo(i.wrapper),
                e(t).append(i.wrapper)
        }

        return t.prototype.show = function () {
            this.wrapper.fadeIn(300),
                this.isOpen = !0
        }
            ,
            t.prototype.dispose = function () {
                var e = this;
                e.box.off(),
                    e.wrapper.off().remove()
            }
            ,
            t.prototype.close = function () {
                this.wrapper.fadeOut(300),
                    this.isOpen = !1
            }
            ,
            t
    }(jQuery);
var PDFLinkService = function () {
    function e() {
        this.baseUrl = null,
            this.pdfDocument = null,
            this.pdfViewer = null,
            this.pdfHistory = null,
            this._pagesRefCache = null
    }

    return e.prototype = {
        dispose: function () {
            this.baseUrl = null,
                this.pdfDocument = null,
                this.pdfViewer = null,
                this.pdfHistory = null,
                this._pagesRefCache = null
        },
        setDocument: function (e, t) {
            this.baseUrl = t,
                this.pdfDocument = e,
                this._pagesRefCache = Object.create(null)
        },
        setViewer: function (e) {
            this.pdfViewer = e
        },
        setHistory: function (e) {
            this.pdfHistory = e
        },
        get pagesCount() {
            return this.pdfDocument.numPages
        },
        get page() {
            return this.pdfViewer.currentPageNumber
        },
        set page(e) {
            this.pdfViewer.currentPageNumber = e
        },
        navigateTo: function (e) {
            var t, n = "", i = this, o = function (t) {
                var a = t instanceof Object ? i._pagesRefCache[t.num + " " + t.gen + " R"] : t + 1;
                a ? (i.pdfViewer.contentProvider.options.pageSize == FLIPBOOKPROCOM.PAGE_SIZE.DOUBLEINTERNAL && a > 2 && (a = 2 * a - 1),
                a > i.pdfViewer.pageCount && (a = i.pdfViewer.pageCount),
                    i.pdfViewer.gotoPage(a),
                i.pdfHistory && i.pdfHistory.push({
                    dest: e,
                    hash: n,
                    page: a
                })) : i.pdfDocument.getPageIndex(t).then(function (e) {
                    var n = e + 1
                        , a = t.num + " " + t.gen + " R";
                    i._pagesRefCache[a] = n,
                        o(t)
                })
            };
            "string" == typeof e ? (n = e,
                t = this.pdfDocument.getDestination(e)) : t = Promise.resolve(e),
                t.then(function (t) {
                    e = t,
                    t instanceof Array && o(t[0])
                })
        },
        customNavigateTo: function (e) {
            if ("" != e && null != e && "null" != e) {
                var t = null;
                if (isNaN(Math.round(e))) {
                    if ("string" == typeof e && (t = parseInt(e.replace("#", ""), 10),
                        isNaN(t)))
                        return void window.open(e)
                } else
                    t = e;
                null != t && this.pdfViewer.gotoPage(t)
            }
        },
        getDestinationHash: function (e) {
            if ("string" == typeof e)
                return this.getAnchorUrl("#" + escape(e));
            if (e instanceof Array) {
                var t = e[0]
                    , n = t instanceof Object ? this._pagesRefCache[t.num + " " + t.gen + " R"] : t + 1;
                if (n) {
                    var i = this.getAnchorUrl("#page=" + n)
                        , o = e[1];
                    if ("object" == typeof o && "name" in o && "XYZ" === o.name) {
                        var a = e[4] || this.pdfViewer.currentScaleValue
                            , r = parseFloat(a);
                        r && (a = 100 * r),
                            i += "&zoom=" + a,
                        (e[2] || e[3]) && (i += "," + (e[2] || 0) + "," + (e[3] || 0))
                    }
                    return i
                }
            }
            return this.getAnchorUrl("")
        },
        getCustomDestinationHash: function (e) {
            return "#" + escape(e)
        },
        getAnchorUrl: function (e) {
            return (this.baseUrl || "") + e
        },
        setHash: function (e) {
            if (e.indexOf("=") >= 0) {
                var t = parseQueryString(e);
                if ("nameddest" in t)
                    return this.pdfHistory && this.pdfHistory.updateNextHashParam(t.nameddest),
                        void this.navigateTo(t.nameddest);
                var n, i;
                if ("page" in t && (n = 0 | t.page || 1),
                "zoom" in t) {
                    var o = t.zoom.split(",")
                        , a = o[0]
                        , r = parseFloat(a);
                    -1 === a.indexOf("Fit") ? i = [null, {
                        name: "XYZ"
                    }, o.length > 1 ? 0 | o[1] : null, o.length > 2 ? 0 | o[2] : null, r ? r / 100 : a] : "Fit" === a || "FitB" === a ? i = [null, {
                        name: a
                    }] : "FitH" === a || "FitBH" === a || "FitV" === a || "FitBV" === a ? i = [null, {
                        name: a
                    }, o.length > 1 ? 0 | o[1] : null] : "FitR" === a ? 5 !== o.length ? console.error("PDFLinkService_setHash: Not enough parameters for 'FitR'.") : i = [null, {
                        name: a
                    }, 0 | o[1], 0 | o[2], 0 | o[3], 0 | o[4]] : console.error("PDFLinkService_setHash: '" + a + "' is not a valid zoom value.")
                }
                if (i ? this.pdfViewer.scrollPageIntoView(n || this.page, i) : n && (this.page = n),
                "pagemode" in t) {
                    var s = document.createEvent("CustomEvent");
                    s.initCustomEvent("pagemode", !0, !0, {
                        mode: t.pagemode
                    }),
                        this.pdfViewer.container.dispatchEvent(s)
                }
            } else
                /^\d+$/.test(e) ? this.page = e : (this.pdfHistory && this.pdfHistory.updateNextHashParam(unescape(e)),
                    this.navigateTo(unescape(e)))
        },
        executeNamedAction: function (e) {
            switch (e) {
                case "GoBack":
                    this.pdfHistory && this.pdfHistory.back();
                    break;
                case "GoForward":
                    this.pdfHistory && this.pdfHistory.forward();
                    break;
                case "NextPage":
                    this.page++;
                    break;
                case "PrevPage":
                    this.page--;
                    break;
                case "LastPage":
                    this.page = this.pagesCount;
                    break;
                case "FirstPage":
                    this.page = 1
            }
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("namedaction", !0, !0, {
                action: e
            }),
                this.pdfViewer.container.dispatchEvent(t)
        },
        cachePageRef: function (e, t) {
            var n = t.num + " " + t.gen + " R";
            this._pagesRefCache[n] = e
        }
    },
        e
}();
FLIPBOOKPROCOM.TextLayerBuilder = function () {
    function e(e) {
        this.textLayerDiv = e.textLayerDiv,
            this.renderingDone = !1,
            this.divContentDone = !1,
            this.pageIdx = e.pageIndex,
            this.pageNumber = this.pageIdx + 1,
            this.matches = [],
            this.viewport = e.viewport,
            this.textDivs = [],
            this.findController = e.findController || null,
            this.textLayerRenderTask = null,
            this.enhanceTextSelection = e.enhanceTextSelection,
            this._bindMouse()
    }

    return e.prototype = {
        _finishRendering: function () {
            if (this.renderingDone = !0,
                !this.enhanceTextSelection) {
                var e = document.createElement("div");
                e.className = "endOfContent",
                    this.textLayerDiv.appendChild(e)
            }
        },
        render: function (e) {
            if (this.divContentDone && !this.renderingDone) {
                this.textLayerRenderTask && (this.textLayerRenderTask.cancel(),
                    this.textLayerRenderTask = null),
                    this.textDivs = [];
                var t = document.createDocumentFragment();
                this.textLayerRenderTask = PDFJS.renderTextLayer({
                    textContent: this.textContent,
                    container: t,
                    viewport: this.viewport,
                    textDivs: this.textDivs,
                    timeout: e,
                    enhanceTextSelection: this.enhanceTextSelection
                }),
                    this.textLayerRenderTask.promise.then(function () {
                        this.textLayerDiv.appendChild(t),
                            this._finishRendering(),
                            this.updateMatches()
                    }
                        .bind(this), function (e) {
                    })
            }
        },
        setTextContent: function (e) {
            this.textLayerRenderTask && (this.textLayerRenderTask.cancel(),
                this.textLayerRenderTask = null),
                this.textContent = e,
                this.divContentDone = !0
        },
        convertMatches: function (e, t) {
            var n = 0
                , i = 0
                , o = this.textContent.items
                , a = o.length - 1
                , r = null === this.findController ? 0 : this.findController.state.query.length
                , s = [];
            if (!e)
                return s;
            for (var l = 0, c = e.length; l < c; l++) {
                for (var d = e[l]; n !== a && d >= i + o[n].str.length;)
                    i += o[n].str.length,
                        n++;
                n === o.length && console.error("Could not find a matching mapping");
                var u = {
                    begin: {
                        divIdx: n,
                        offset: d - i
                    }
                };
                for (d += t ? t[l] : r; n !== a && d > i + o[n].str.length;)
                    i += o[n].str.length,
                        n++;
                u.end = {
                    divIdx: n,
                    offset: d - i
                },
                    s.push(u)
            }
            return s
        },
        renderMatches: function (e) {
            function t(e, t) {
                var i = e.divIdx;
                o[i].textContent = "",
                    n(i, 0, e.offset, t)
            }

            function n(e, t, n, a) {
                var r = o[e]
                    , s = i[e].str.substring(t, n)
                    , l = document.createTextNode(s);
                if (a) {
                    var c = document.createElement("span");
                    return c.className = a,
                        c.appendChild(l),
                        void r.appendChild(c)
                }
                r.appendChild(l)
            }

            if (0 !== e.length) {
                var i = this.textContent.items
                    , o = this.textDivs
                    , a = null
                    , r = this.pageIdx
                    , s = null !== this.findController && r === this.findController.selected.pageIdx
                    , l = null === this.findController ? -1 : this.findController.selected.matchIdx
                    , c = {
                    divIdx: -1,
                    offset: void 0
                }
                    , d = l
                    , u = d + 1;
                if (null !== this.findController && this.findController.state.highlightAll)
                    d = 0,
                        u = e.length;
                else if (!s)
                    return;
                for (var h = d; h < u; h++) {
                    var p = e[h]
                        , g = p.begin
                        , f = p.end
                        , m = s && h === l ? " selected" : "";
                    if (this.findController && this.findController.updateMatchPosition(r, h, o, g.divIdx),
                        a && g.divIdx === a.divIdx ? n(a.divIdx, a.offset, g.offset) : (null !== a && n(a.divIdx, a.offset, c.offset),
                            t(g)),
                    g.divIdx === f.divIdx)
                        n(g.divIdx, g.offset, f.offset, "highlight" + m);
                    else {
                        n(g.divIdx, g.offset, c.offset, "highlight begin" + m);
                        for (var v = g.divIdx + 1, b = f.divIdx; v < b; v++)
                            o[v].className = "highlight middle" + m;
                        t(f, "highlight end" + m)
                    }
                    a = f
                }
                a && n(a.divIdx, a.offset, c.offset)
            }
        },
        updateMatches: function () {
            if (this.renderingDone) {
                for (var e = this.matches, t = this.textDivs, n = this.textContent.items, i = -1, o = 0, a = e.length; o < a; o++) {
                    for (var r = e[o], s = Math.max(i, r.begin.divIdx), l = r.end.divIdx; s <= l; s++) {
                        var c = t[s];
                        c.textContent = n[s].str,
                            c.className = ""
                    }
                    i = r.end.divIdx + 1
                }
                if (null !== this.findController && this.findController.active) {
                    var d, u;
                    null !== this.findController && (d = this.findController.pageMatches[this.pageIdx] || null,
                        u = this.findController.pageMatchesLength ? this.findController.pageMatchesLength[this.pageIdx] || null : null),
                        this.matches = this.convertMatches(d, u),
                        this.renderMatches(this.matches)
                }
            }
        },
        _bindMouse: function () {
            var e = this.textLayerDiv
                , t = this;
            e.addEventListener("mousedown", function (n) {
                if (t.enhanceTextSelection && t.textLayerRenderTask)
                    t.textLayerRenderTask.expandTextDivs(!0);
                else {
                    var i = e.querySelector(".endOfContent");
                    if (i) {
                        var o = n.target !== e;
                        if (o = o && "none" !== window.getComputedStyle(i).getPropertyValue("-moz-user-select")) {
                            var a = e.getBoundingClientRect()
                                , r = Math.max(0, (n.pageY - a.top) / a.height);
                            i.style.top = (100 * r).toFixed(2) + "%"
                        }
                        i.classList.add("active")
                    }
                }
            }),
                e.addEventListener("mouseup", function (n) {
                    if (t.enhanceTextSelection && t.textLayerRenderTask)
                        t.textLayerRenderTask.expandTextDivs(!1);
                    else {
                        var i = e.querySelector(".endOfContent");
                        i && (i.style.top = "",
                            i.classList.remove("active"))
                    }
                })
        }
    },
        e
}(),
    FLIPBOOKPROCOM.ConvertPageLinks = function () {
        for (var e, t = arguments[0] / 100, n = arguments[1] / 100, i = [], o = 2; o < arguments.length; o++)
            e = arguments[o],
                i[o - 2] = function (e, i, o, a, r) {
                    return {
                        x: e / t,
                        y: i / n,
                        w: o / t,
                        h: a / n,
                        dest: r
                    }
                }
                    .apply(this, e);
        return i
    }
    ,
    FLIPBOOKPROCOM.parseLinks = function (e) {
        var t;
        if (null != e && e.length > 0)
            for (var n = 0; n < e.length; n++)
                null != (t = e[n]) && null != t[0] && null == t[0].dest && (t = FLIPBOOKPROCOM.ConvertPageLinks.apply(this, t),
                    e[n] = t);
        return e
    }
    ,
    function (e) {
        function t(e) {
            return "true" == e || 1 == e
        }

        function n(e) {
            null != e.webgl && (e.webgl = t(e.webgl)),
            null != e.enableDownload && (e.enableDownload = t(e.enableDownload)),
            null != e.scrollWheel && (e.scrollWheel = t(e.scrollWheel)),
            null != e.autoEnableOutline && (e.autoEnableOutline = t(e.autoEnableOutline)),
            null != e.autoEnableThumbnail && (e.autoEnableThumbnail = t(e.autoEnableThumbnail)),
            null != e.transparent && (e.transparent = t(e.transparent)),
            null != e.overwritePDFOutline && (e.overwritePDFOutline = t(e.overwritePDFOutline)),
            null != e.soundEnable && (e.soundEnable = t(e.soundEnable)),
            null != e.forceFit && (e.forceFit = t(e.forceFit)),
            null != e.enableAnnotation && (e.enableAnnotation = t(e.enableAnnotation)),
            null != e.webglShadow && (e.webglShadow = t(e.webglShadow)),
            null != e.autoPlay && (e.autoPlay = t(e.autoPlay)),
            null != e.autoPlayStart && (e.autoPlayStart = t(e.autoPlayStart)),
            null != e.paddingTop && (e.paddingTop = parseInt(e.paddingTop, 10)),
            null != e.paddingRight && (e.paddingRight = parseInt(e.paddingRight, 10)),
            null != e.paddingBottom && (e.paddingBottom = parseInt(e.paddingBottom, 10)),
            null != e.paddingLeft && (e.paddingTop = parseInt(e.paddingLeft, 10)),
            null != e.zoomRatio && (e.zoomRatio = parseFloat(e.zoomRatio, 10)),
            null != e.stiffness && (e.stiffness = parseFloat(e.stiffness, 10)),
            null != e.autoPlayDuration && (e.autoPlayDuration = parseInt(e.autoPlayDuration, 10)),
            0 != e.pageMode && "0" != e.pageMode || (e.pageMode = null),
            0 != e.singlePageMode && "0" != e.singlePageMode || (e.singlePageMode = null)
        }

        function i(e) {
            if (1 != e.parsed) {
                e.parsed = !0;
                var t = [];
                if (n(e),
                "undefined" != typeof FLIPBOOKPROCOMWPGlobal && "true" == e.wpOptions) {
                    try {
                        for (var i in e.links) {
                            for (var o = e.links[i], a = [100, 100], r = 0; r < o.length; r++) {
                                for (var s = o[r].substr(1).slice(0, -1).split(","), l = [], c = 0; c < 5; c++)
                                    l[c] = s[c];
                                a.push(l)
                            }
                            t[parseInt(i, 10) + 1] = a
                        }
                    } catch (e) {
                        console.error(e.stack)
                    }
                    e.links = FLIPBOOKPROCOM.parseLinks(t)
                } else
                    e.links = FLIPBOOKPROCOM.parseLinks(e.links)
            }
        }

        FLIPBOOKPROCOM.getOptions = function (t) {
            var n = "option_" + (t = e(t)).attr("id")
                , o = t.attr("source") || t.attr("df-source");
            (n = null == n || "" == n || null == window[n] ? {} : window[n]).source = null == o || "" == o ? n.source : o;
            var a = {
                webgl: t.attr("webgl"),
                height: t.attr("height"),
                soundEnable: t.attr("sound"),
                transparent: t.attr("transparent"),
                enableDownload: t.attr("download"),
                duration: t.attr("duration"),
                hard: t.attr("hard"),
                pageMode: t.attr("pagemode"),
                direction: t.attr("direction"),
                backgroundColor: t.attr("backgroundcolor"),
                scrollWheel: t.attr("scrollwheel"),
                backgroundImage: t.attr("backgroundimage"),
                paddingTop: t.attr("paddingtop"),
                paddingRight: t.attr("paddingright"),
                paddingBottom: t.attr("paddingbottom"),
                paddingLeft: t.attr("paddingleft"),
                wpOptions: t.attr("wpoptions")
            };
            return n = e.extend(!0, {}, n, a),
                i(n),
                n
        }
            ,
            FLIPBOOKPROCOM.parseBooks = function () {
                e("._df_button, ._df_thumb, ._df_custom, ._df_book").each(function () {
                    var t = e(this);
                    if ("true" !== (t.attr("parsed") || t.attr("df-parsed")))
                        if (t.attr("df-parsed", "true"),
                            t.hasClass("_df_book")) {
                            var n = t.attr("id")
                                , i = t.attr("slug")
                                , o = FLIPBOOKPROCOM.getOptions(t);
                            o.id = n,
                            null != i && (o.slug = i),
                                n ? window[n.toString()] = e(t).flipBook(o.source, o) : e(t).flipBook(o.source, o)
                        } else if (t.hasClass("_df_thumb")) {
                            var a = e("<div class='_df_book-cover'>")
                                , r = t.html().trim();
                            t.html("");
                            e("<span class='_df_book-title'>").html(r).appendTo(a);
                            var s = t.attr("thumb") || t.attr("df-thumb")
                                , l = t.attr("thumbtype") || FLIPBOOKPROCOM.defaults.thumbElement || "div"
                                , c = t.attr("tags") || t.attr("df-tags");
                            if (c && (c = c.split(",")).length > 0)
                                for (var d = 0; d < c.length; d++)
                                    t.append("<span class='_df_book-tag'>" + c[d] + "</span>");
                            null != s && "" != s.toString().trim() ? "img" == l ? (a.append('<img src="' + s + '" alt="' + r + '"/>'),
                                t.attr("thumb-type", "img")) : a.css({
                                backgroundImage: "url(" + s + ")"
                            }) : a.addClass("_df_thumb-not-found"),
                                t.append(a)
                        }
                })
            }
            ,
            e(document).ready(function () {
                if ("undefined" != typeof FLIPBOOKPROCOMLocation && (FLIPBOOKPROCOMLocation.length > 2 && "/" !== FLIPBOOKPROCOMLocation.slice(-1) && (window.FLIPBOOKPROCOMLocation += "/"),
                    FLIPBOOKPROCOM.defaults.mockupjsSrc = FLIPBOOKPROCOMLocation + "js/libs/mockup.min.js",
                    FLIPBOOKPROCOM.defaults.pdfjsSrc = FLIPBOOKPROCOMLocation + "js/libs/pdf.min.js",
                    FLIPBOOKPROCOM.defaults.pdfjsCompatibilitySrc = FLIPBOOKPROCOMLocation + "js/libs/compatibility.js",
                    FLIPBOOKPROCOM.defaults.threejsSrc = FLIPBOOKPROCOMLocation + "js/libs/three.min.js",
                    FLIPBOOKPROCOM.defaults.pdfjsWorkerSrc = FLIPBOOKPROCOMLocation + "js/libs/pdf.worker.js",
                    FLIPBOOKPROCOM.defaults.soundFile = FLIPBOOKPROCOMLocation + "sound/turn2.mp3",
                    FLIPBOOKPROCOM.defaults.imagesLocation = FLIPBOOKPROCOMLocation + "images",
                    FLIPBOOKPROCOM.defaults.imageResourcesPath = FLIPBOOKPROCOMLocation + "images/pdfjs/",
                "undefined" != typeof FLIPBOOKPROCOMWPGlobal && (n(FLIPBOOKPROCOMWPGlobal),
                    e.extend(FLIPBOOKPROCOM.defaults, FLIPBOOKPROCOMWPGlobal))),
                    FLIPBOOKPROCOM.preParseHash = window.location.hash,
                    FLIPBOOKPROCOM.parseBooks(),
                    e("body").on("click", "._df_button, ._df_thumb, ._df_custom", function () {
                        var t = e(this);
                        window.dfLightBox || (window.dfLightBox = new DFLightBox(function () {
                                0 == window.location.hash.indexOf("#flip") && (window.location.hash = "#_"),
                                    window.dfActiveLightBoxBook.dispose(),
                                    window.dfActiveLightBoxBook = null
                            }
                        )),
                            window.dfLightBox.duration = 500,
                            window.dfActiveLightBoxBook && window.dfActiveLightBoxBook.dispose ? window.dfActiveLightBoxBook.dispose() : window.dfLightBox.show(function () {
                                var n = FLIPBOOKPROCOM.getOptions(t);
                                n.transparent = !1,
                                    n.id = t.attr("id");
                                var i = t.attr("slug");
                                null != i && (n.slug = i),
                                    n.isLightBox = !0,
                                    window.dfActiveLightBoxBook = e(window.dfLightBox.container).flipBook(n.source, n)
                            })
                    }),
                (FLIPBOOKPROCOM.utils.isSafari || FLIPBOOKPROCOM.utils.isIOS) && e("body").addClass("df-webkit"),
                FLIPBOOKPROCOM.preParseHash && FLIPBOOKPROCOM.preParseHash.indexOf("flip") >= 0) {
                    var t = FLIPBOOKPROCOM.preParseHash.split("flip")[1].split("/")[0]
                        , i = FLIPBOOKPROCOM.preParseHash.split("flip")[1].split("/")[1];
                    null != i && (i = i.split("/")[0]);
                    var o;
                    0 == (o = e("[slug=" + t + "]")).length && (o = e("#" + t)),
                    o.length > 0 && (null != i && o.data("page", i),
                    o.is("._df_button, ._df_thumb, ._df_custom") && o.trigger("click"))
                }
                e("body").on("click", ".df-ui-sidemenu-close", function () {
                    e(this).closest(".df-container").find(".df-ui-outline.df-active , .df-ui-thumbnail.df-active").trigger("click")
                })
            })
    }(jQuery);
