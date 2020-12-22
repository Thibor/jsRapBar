(function ($) {
	$.fn.jsRapBar = function (options) {

		return this.each(function () {
			this.opt = $.extend({
				enabled: true,
				position: 0,
				width: '100%',
				height: '16px',
				barColor: 'green',
				backColor: 'white',
				onMouseUp: null,
				onChange: null
			}, options);
			let base = this;
			$(this).empty().addClass('rapBarOut').css({ width: this.opt.width, height: this.opt.height, background: this.opt.backColor });
			let inBar = $('<div>').addClass('rapBarIn').css({ 'background-color': this.opt.barColor }).appendTo($(this));

			if (this.opt.enabled)
				$(this).bind({
					click: function (e) {
						UpdatePosition(e);
					},
					mousemove: function (e) {
						if (e.buttons == 1)
							UpdatePosition(e)
					},
					mouseup: function (e) {
						if (this.opt.onMouseUp)
							this.opt.onMouseUp.call(this, this.opt.position);
					}
				});

			function UpdatePosition(e) {
				let p = (e.clientX - $(base)[0].getBoundingClientRect().left) / $(base).width();
				base.SetPosition(p);
			}

			this.SetPosition = function(p) {
				if (p < 0)
					p = 0;
				if (p > 1)
					p = 1;
				this.opt.position = p;
				inBar.width( p * 100 + '%');
				if (this.opt.onChange)
					this.opt.onChange.call(this, p);
			}

			this.SetPosition(this.opt.position);
		})

	}
})(jQuery);