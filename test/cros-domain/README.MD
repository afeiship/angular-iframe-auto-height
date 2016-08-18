#cros-domain-solution:
假设www.a.com下的一个页面a.html要包含www.b.com下的一个页面c.html。


1.a.html中包含iframe:
<iframe src="http://www.b.com/c.html" id="Iframe" frameborder="0" scrolling="no" style="border:0px;"></iframe>


2.在c.html中加入如下代码：

<iframe id="c_iframe"  height="0" width="0"  src="http://www.a.com/agent.html" style="display:none" ></iframe>
<script type="text/javascript">
(function autoHeight(){
var b_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
var b_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
var c_iframe = document.getElementById("c_iframe");
c_iframe.src = c_iframe.src + "#" + b_width + "|" + b_height;  // 这里通过hash传递b.htm的宽高
})();
</script>


3.最后，agent.html中放入一段js:

<script type="text/javascript">
var b_iframe = window.parent.parent.document.getElementById("Iframe");
var hash_url = window.location.hash;
if(hash_url.indexOf("#")>=0){
var hash_width = hash_url.split("#")[1].split("|")[0]+"px";
var hash_height = hash_url.split("#")[1].split("|")[1]+"px";
b_iframe.style.width = hash_width;
b_iframe.style.height = hash_height;
}
</script>


4.agent.html从URL中获得宽度值和高度值，并设置iframe的高度和宽度（因为agent.html在www.a.com下，所以操作a.html时不受JavaScript的同源限制）
