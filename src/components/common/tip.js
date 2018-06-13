export default function(args){
  var tclass = args.type || 'info', ttitle = args.title || '', tcontent = args.message || ''
  var exsistTip = $('body .tip')
  if(exsistTip.length){
    exsistTip.remove()
  }
  var _html =`
    <div class="tip tip-${tclass}">
      <strong>${ttitle}</strong> ${tcontent}
    </div>
  `
  _html = $(_html)
  $('body').append(_html)
  setTimeout(()=>{
    _html.css({'-webkit-transform':'translateY(0%)','transform':'translateY(0%)'})
  },0)
  setTimeout(()=>{
    _html.removeAttr('style')
  },3500)
}