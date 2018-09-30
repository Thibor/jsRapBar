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
	var base = this;
	var button = 0;
	$(this).css({width:this.opt.width,height:this.opt.height,background:this.opt.backColor}).addClass('rapBarOut');
	var inBar = $('<div>').addClass('rapBarIn').css({'background-color':this.opt.barColor,'width':this.opt.position * 100 + '%'}).appendTo($(this));
	
	if(this.opt.enabled)
		$(this).bind({
			click : function(e){
				Update(this,e);
			},
			mousemove:function(e){
				if(button)
					Update(this,e)
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
				if(this.opt.onMouseUp)this.opt.onMouseUp.call(this,this.opt.position);
			}
		});	
		
	function Update(obj,e){
		let cw = e.clientX - $(base)[0].getBoundingClientRect().left;
		let bw = $(base).width();
		inBar.width(cw);
		base.opt.position = cw / bw;
		if(base.opt.onChange)
			base.opt.onChange.call(base,base.opt.position);
	}
			
	this.SetPosition = function(p){
		this.opt.position = p;
		inBar.css('width',p * 100 + '%');
	}
			
})

}})(jQuery);