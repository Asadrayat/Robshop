document.addEventListener("DOMContentLoaded", () => {
  // Delegate the event to a parent container that won't change
  const collectionSidebar = document.querySelector("[data-main-collection]"); // Make sure this is a static container

  if (collectionSidebar) {
    collectionSidebar.addEventListener("click", function (event) {
      // Check if the clicked target is a collapsible item
      const collectionFilterDropdown = event.target.closest(
        "[data-collection-sidebar]"
      );

      if (collectionFilterDropdown) {
        const cdIcon = collectionFilterDropdown.querySelector(
          "[data-collapse-icon]"
        ); // Find the[data-collapse-icon] for the clicked element
        const cdContent = collectionFilterDropdown.querySelector(
          "[data-collapse-content]"
        ); // Find the collapsible-content for the clicked element

        console.log(collectionFilterDropdown);
        console.log(cdIcon);
        console.log(cdContent);

        // Remove 'is-open' class from all dropdowns
        const collectionFilterDropdowns = collectionSidebar.querySelectorAll(
          "[data-collection-sidebar]"
        );
        collectionFilterDropdowns.forEach((cd) => {
          const iconThis = cd.querySelector("[data-collapse-icon]");
          const contentThis = cd.querySelector("[data-collapse-content]");
          if (iconThis !== cdIcon) {
            // Ensure the clicked element is not also closed
            iconThis.classList.remove("is-open");
          }
          if (contentThis !== cdContent) {
            // Ensure the clicked element is not also closed
            contentThis.classList.remove("is-open");
            contentThis.style.height = "0"; // Corrected to set the height to 0
          }
        });

        // Add 'is-open' class to the clicked element
        cdIcon.classList.add("is-open");
        cdContent.classList.add("is-open");

        // Set the height of the clicked content to show it
        cdContent.style.height = "max-content"; // Corrected to assign height to max-content
      }
    });
  }

  const pdDesc = document.querySelector("[data-pd-description]");
  const pdShowBtn = document.querySelector("#pd-show__more");

  pdShowBtn.addEventListener("click", function () {
    // Toggle the active class on the description and the button
    pdDesc.classList.toggle("active");

    // Change the button text depending on the state
    if (pdDesc.classList.contains("active")) {
      this.querySelector(".content__").innerText = "Show Less";
    } else {
      this.querySelector(".content__").innerText = "Show More";
    }

    // Toggle the button's active class to control its appearance
    this.classList.toggle("active");
  });
});

// class CollectionProduct extends HTMLElement {
//   index = 0;

//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.loadMoreBtn = this.querySelector("#load-more");
//     this.productPerRow = parseInt(this.dataset.productPerRow);
//     this.remainingProduct = this.dataset.remainingProducts?.split(",") || [];

//     if (this.loadMoreBtn) {
//       this.loadMoreBtn.addEventListener("click", this.loadMoreProducts.bind(this))
//     } else {
//       console.warn("Load More button not found!");
//     }
//   }

// loadMoreProducts() {
//   console.log("Load More Products clicked");

//   if (this.index >= this.remainingProduct.length) return;

//   const productsToLoad = this.remainingProduct.slice(this.index, this.index + this.productPerRow);
//   const productsPromises = productsToLoad.map((productHandle) => {
//     return fetch(`/products/${productHandle}?sections=card-product`)
//       .then(res => res.json());
//   });

//   Promise.all(productsPromises)
//     .then(products => {
//       products.forEach((product) => {
//         // Parse the HTML string into a DOM element
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(product["card-product"], "text/html");

//         // Extract the grid item from the parsed DOM
//         const gridItem = doc.querySelector(".grid__item");

//         // Append the grid item to the container
//         if (gridItem) {
//           this.innerHTML += gridItem.outerHTML;
//         }
//       });

//       this.index += this.productPerRow;
//       console.log(this.index)
//       if (this.index >= this.remainingProduct.length) {
//         this.loadMoreBtn.remove();
//       }
//     })
//     .catch(err => console.error("Something went wrong:", err));
// }

// }

document.addEventListener("DOMContentLoaded", () => {
  // customElements.define("collection-products", CollectionProduct);

  if (document.querySelectorAll(".--variant-size")) {
    document.querySelectorAll(".--variant-size").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const { variant } = btn.dataset;

        let formData = {
          items: [
            {
              id: variant,
              quantity: 1,
            },
          ],
        };

        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            new theme.CartDrawer()
            if(document.querySelector(".js-drawer-open-cart")) {
              document.querySelector(".js-drawer-open-cart").click()
            }
          })
      });
    });

  }
});
