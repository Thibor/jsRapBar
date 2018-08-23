(function($){
$.fn.jsRapBar = function(options){
var defaults = {
	enabled:true,
	position:0,
	width:'100%',
	height:'16px',
	barColor:'green',
	backColor:'white'
}
	
return this.each(function() {
	this.opt = $.extend(defaults,options);
	$(this).css({width:this.opt.width,height:this.opt.height,background:this.opt.backColor}).addClass('rapBarOut');
	var inBar = $('<div>').addClass('rapBarIn').css({'background-color':this.opt.barColor,'width':this.opt.position * 100 + '%'}).appendTo($(this));
	if(this.opt.enabled)
		$(this).bind({
			click : function(e){
				e.preventDefault();
				inBar.width(e.pageX - findRealLeft(this));
				this.opt.position = inBar.width() / $(this).width();
				if(this.opt.onClick)
					this.opt.onClick.call(this,this.opt.position);
		}
		});	
	
	function findRealLeft(obj) {
			  if( !obj ) return 0;
			  return obj.offsetLeft + findRealLeft(obj.offsetParent);
			};
			
	this.SetPosition = function(p){
		this.opt.position = p;
		inBar.css('width',p * 100 + '%');
	}
			
})

}})(jQuery);