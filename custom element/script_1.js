document.querySelectorAll(".section-simplebar").forEach(dropdown => {
    new SimpleBar(dropdown, {
    /* чтобы изначально ползунок был виден */
    autoHide: false,
    /* с помощью этого значения вы можете управлять высотой ползунка*/
    scrollbarMaxSize: 70,
  });
  })
