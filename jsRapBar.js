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
				onClick: null,
				onChange: null
			}, options);
			$(this).empty().addClass('rapBarOut').css({ width: this.opt.width, height: this.opt.height, background: this.opt.backColor });
			let inBar = $('<div>').addClass('rapBarIn').css({ 'background-color': this.opt.barColor }).appendTo($(this));

			if (this.opt.enabled)
				$(this).bind({
					click: function (e) {
						this.UpdatePosition(e);
						if (this.opt.onClick)
							this.opt.onClick.call(this, this.opt.position); 
					},
					mousemove: function (e) {
						if (e.buttons == 1)
							this.UpdatePosition(e);
					}
				});

			this.UpdatePosition = function(e) {
				let p = (e.clientX - this.getBoundingClientRect().left) / $(this).width();
				this.SetPosition(p);
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