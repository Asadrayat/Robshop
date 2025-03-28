document.addEventListener("DOMContentLoaded", function(){
  const quickAddBtns = document.querySelectorAll("[data-quick__add]");
  
  quickAddBtns.forEach((quickAddBtn) => {
    quickAddBtn.addEventListener("click", function(event){
      event.stopPropagation(); // Prevent bubbling issues
      this.classList.toggle("active");
      const variantWrapper = this.querySelector(".qa__variant-wrapper");
      if (variantWrapper) {
        variantWrapper.classList.toggle("active");
      }
    });

    // Find the closest grid-product__has-quick-shop parent
    const parentContainer = quickAddBtn.closest(".grid-product__has-quick-shop");

    if (parentContainer) {
      parentContainer.addEventListener("mouseleave", function(){
        const activeVariantWrapper = parentContainer.querySelector(".qa__variant-wrapper");
        if (activeVariantWrapper) {
          activeVariantWrapper.classList.remove("active");
          quickAddBtns.forEach((quickAddBtn) =>{
            quickAddBtn.classList.remove("active");
          })
        }
      });
    }
  });
});
