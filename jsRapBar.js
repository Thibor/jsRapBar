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
						Update(e);
					},
					mousemove: function (e) {
						if (e.buttons == 1)
							Update(e)
					},
					mouseup: function (e) {
						if (this.opt.onMouseUp)
							this.opt.onMouseUp.call(this, this.opt.position);
					}
				});

			function Update(e) {
				let cw = e.clientX - $(base)[0].getBoundingClientRect().left;
				let bw = $(base).width();
				base.SetPosition(cw / bw);
			}

			this.SetPosition = function (p) {
				if (p < 0)
					p = 0;
				if (p > 1)
					p = 1;
				this.opt.position = p;
				inBar.css('width', p * 100 + '%');
				if (this.opt.onChange)
					this.opt.onChange.call(this, p);
			}

			this.SetPosition(this.opt.position);
		})

	}
})(jQuery);