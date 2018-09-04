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
		onClick:null,
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
				if(this.opt.onClick)
					this.opt.onClick.call(this,this.opt.position);
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
			}
		});	
		
	function Update(obj,e){
		var cw = e.pageX - findRealLeft(obj);
		var bw = $(base).width();
		if(cw < 0)cw = 0;
		if(cw > bw)cw = bw;
		inBar.width(cw);
		base.opt.position = cw / bw;
		if(base.opt.onChange)
			base.opt.onChange.call(base,base.opt.position);
	}
	
	function findRealLeft(obj){
		if( !obj ) return 0;
		return obj.offsetLeft + findRealLeft(obj.offsetParent);
	}
			
	this.SetPosition = function(p){
		this.opt.position = p;
		inBar.css('width',p * 100 + '%');
	}
			
})

}})(jQuery);