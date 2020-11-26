class Fdj {
    constructor(options) {
        this.init(options)
    }
    init(options) {
        this.small_img = this.selector(options.small_img)
        this.large_box = this.selector(options.large_box)
        this.large_img = this.selector(options.large_img)
        this.mask = this.selector(options.mask)
        this.mask_left = 0
        this.mask_top = 0

        this.addMoveEvent(this.small_img)
        this.addLeaveEvent(this.small_img)
    }
    selector(ele) {
        return document.querySelector(ele)
    }
    addMoveEvent(ele) {
        let _this = this
        ele.onmousemove = function(e) {
            _this.change_style_state(_this.large_box, 'display', 'block')
            _this.change_style_state(_this.mask, 'display', 'block')

            _this.mask_left = e.clientX - _this.offset(_this.small_img).left - _this.mask.clientWidth / 2
            _this.mask_top = e.clientY - _this.offset(_this.small_img).top - _this.mask.clientHeight / 2

            _this.mask_left = _this.determine_boundary(_this.mask_left, 0, _this.small_img.clientWidth - _this.mask.clientWidth)

            _this.mask_top = _this.determine_boundary(_this.mask_top, 0, _this.small_img.clientHeight - _this.mask.clientHeight)

            _this.change_style_state(_this.mask, 'left', _this.mask_left + 'px')
            _this.change_style_state(_this.mask, 'top', _this.mask_top + 'px')

            let scaleX = _this.mask_left / (_this.small_img.clientWidth - _this.mask.clientWidth)
            let scaleY = _this.mask_top / (_this.small_img.clientHeight - _this.mask.clientHeight)

            _this.change_style_state(_this.large_img, 'left', -scaleX * (_this.large_img.clientWidth - _this.large_box.clientWidth) + 'px')
            _this.change_style_state(_this.large_img, 'top', -scaleY * (_this.large_img.clientHeight - _this.large_box.clientHeight) + 'px')
        }
    }
    addLeaveEvent(ele) {
        let _this = this
        ele.onmouseleave = function() {
            _this.change_style_state(_this.mask, 'display', 'none')
            _this.change_style_state(_this.large_box, 'display', 'none')
        }
    }
    determine_boundary(boundary, lowest, highest) {
        if (boundary < lowest) {
            return lowest
        } else if (boundary >= highest) {
            return highest
        } else {
            return boundary
        }
    }
    offset(dom, bool) {
        let left = 0
        let top = 0
        let small_img_left = dom.clientLeft
        let small_img_top = dom.clientTop

        while (dom != null) {
            left += dom.offsetLeft + dom.clientLeft
            top += dom.offsetTop + dom.clientTop

            dom = dom.offsetParent
        }

        if (bool) {
            return { 'left': left, 'top': top }
        } else {
            return { 'left': left - small_img_left, 'top': top - small_img_top }
        }
    }
    change_style_state(ele, property, stage) {
        ele.style[property] = stage
    }
}