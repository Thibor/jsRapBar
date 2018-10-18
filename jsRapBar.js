(function($){
$.fn.jsRapBar = function(options){
	
return this.each(function(){
	this.opt = $.extend({
		enabled:true,
		position:0,
		width:'100%',
		height:'16px',
		barColor:'green',
		backColor:'white',
		onMouseUp:null,
		onChange:null
	},options);
	let base = this;
	let button = 0;
	$(this).css({width:this.opt.width,height:this.opt.height,background:this.opt.backColor}).addClass('rapBarOut');
	let inBar = $('<div>').addClass('rapBarIn').css({'background-color':this.opt.barColor}).appendTo($(this));
	
	if(this.opt.enabled)
		$(this).bind({
			click : function(e){
				Update(e);
			},
			mousemove:function(e){
				if(button)
					Update(e)
			},
			mousedown:function(e){
				button = 1;
				e = e || window.event;
				e.stopPropagation();
				e.preventDefault();
				if(this.setCapture)
					this.setCapture();
			},
			mouseup:function(e){
				button = 0;
				if(this.opt.onMouseUp)
					this.opt.onMouseUp.call(this,this.opt.position);
			}
		});	
		
	function Update(e){
		let cw = e.clientX - $(base)[0].getBoundingClientRect().left;
		let bw = $(base).width();
		base.SetPosition(cw / bw);
		if(base.opt.onChange)
			base.opt.onChange.call(base,base.opt.position);
	}
			
	this.SetPosition = function(p){
		this.opt.position = p;
		inBar.css('width',p * 100 + '%');
	}
	
	this.SetPosition(this.opt.position);	
})

}})(jQuery);