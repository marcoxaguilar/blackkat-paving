/* Blackkat Paving — interactions */
(function(){
  // mobile nav
  var burger=document.querySelector('.burger');
  var panel=document.querySelector('.mobile-panel');
  if(burger&&panel){
    burger.addEventListener('click',function(){
      var open=panel.classList.toggle('open');
      document.body.classList.toggle('lock',open);
      burger.setAttribute('aria-expanded',open);
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){panel.classList.remove('open');document.body.classList.remove('lock');});
    });
  }

  // scroll reveal + painted underline draw
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');
          e.target.querySelectorAll('.painted').forEach(function(p){p.classList.add('drawn');});
          io.unobserve(e.target);}
      });
    },{threshold:.15});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
    document.querySelectorAll('.painted').forEach(function(p){p.classList.add('drawn');});
  }

  // estimate form -> FormSubmit (AJAX, no redirect)
  var form=document.getElementById('estimate-form');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var btn=form.querySelector('[type=submit]');
      var ok=document.getElementById('form-ok');
      btn.disabled=true;btn.textContent='Sending…';
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(function(r){
          if(r.ok){form.reset();form.style.display='none';if(ok)ok.style.display='block';}
          else{btn.disabled=false;btn.textContent='Get my free estimate';alert('Something went wrong — please call us at the number above.');}
        })
        .catch(function(){btn.disabled=false;btn.textContent='Get my free estimate';alert('Network issue — please call us instead.');});
    });
  }
})();
