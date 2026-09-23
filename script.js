(function () {

  "use strict";


  /* =========================================================
     START AFTER HTML LOAD
  ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {


      /* =======================================================
         PRODUCT SETTINGS
      ======================================================= */

      const PRICE = 995;

      const MIN_QUANTITY = 1;

      const MAX_QUANTITY = 10;


      let quantity = 1;

      let selectedSize = "";


      /* =======================================================
         GOOGLE APPS SCRIPT URL
      ======================================================= */

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxA-H47pYG9-U8qs4LPBolaXHHFTuvkF-w6IZTdkB8I9PhQJMZRYqlEp698qGP6HXHa/exec";


      /* =======================================================
         HELPER FUNCTIONS
      ======================================================= */

      function getElement(id) {

        return document.getElementById(id);

      }


      function bnNumber(number) {

        return Number(number)
          .toLocaleString("bn-BD");

      }


      function money(number) {

        return "৳ " + bnNumber(number);

      }


      /* =======================================================
         ORDER ELEMENTS
      ======================================================= */

      const orderForm =
        getElement("orderForm");


      const submitButton =
        getElement("submitOrderBtn");


      let orderFrame =
        getElement("orderSubmitFrame");


      /* =======================================================
         AUTO CREATE IFRAME IF MISSING
      ======================================================= */

      if (!orderFrame) {

        orderFrame =
          document.createElement("iframe");

        orderFrame.name =
          "orderSubmitFrame";

        orderFrame.id =
          "orderSubmitFrame";

        orderFrame.style.display =
          "none";

        orderFrame.style.width =
          "0";

        orderFrame.style.height =
          "0";

        orderFrame.style.border =
          "0";

        document.body.appendChild(
          orderFrame
        );

      }


      /* =======================================================
         COUNTDOWN
      ======================================================= */

      let totalSeconds =
        (5 * 3600) +
        (47 * 60) +
        23;


      function updateCountdown() {

        const hours =
          getElement("hours");

        const minutes =
          getElement("minutes");

        const seconds =
          getElement("seconds");


        if (
          !hours ||
          !minutes ||
          !seconds
        ) {

          return;

        }


        hours.textContent =
          String(
            Math.floor(
              totalSeconds / 3600
            )
          ).padStart(2, "0");


        minutes.textContent =
          String(
            Math.floor(
              (totalSeconds % 3600) /
              60
            )
          ).padStart(2, "0");


        seconds.textContent =
          String(
            totalSeconds % 60
          ).padStart(2, "0");


        totalSeconds--;


        if (totalSeconds < 0) {

          totalSeconds =
            (5 * 3600) +
            (59 * 60) +
            59;

        }

      }


      updateCountdown();

      setInterval(
        updateCountdown,
        1000
      );


      /* =======================================================
         NOTIFICATION POPUP
      ======================================================= */

      const notifications = [

        "রহিম সাহেব (ঢাকা) এইমাত্র অর্ডার করেছেন!",

        "করিম ভাই (চট্টগ্রাম) অর্ডার করেছেন!",

        "নাসরিন বেগম (সিলেট) অর্ডার করেছেন!",

        "জামাল সাহেব (রাজশাহী) অর্ডার করেছেন!",

        "সুমাইয়া (কুমিল্লা) এইমাত্র অর্ডার করেছেন!",

        "হাকিম সাহেব (খুলনা) অর্ডার করেছেন!",

        "চান মিয়া (চট্টগ্রাম) অর্ডার করেছেন!",

        "হাবিবা খাতুন (সিলেট) অর্ডার করেছেন!",

        "রাজীব (রাজশাহী) অর্ডার করেছেন!",

        "হাবিবুর (কুমিল্লা) অর্ডার করেছেন!"

      ];


      let notificationIndex = 0;


      const notificationPopup =
        getElement("notifPopup");


      const notificationMessage =
        getElement("notifMsg");


      function showNotification() {

        if (
          !notificationPopup ||
          !notificationMessage
        ) {

          return;

        }


        notificationMessage.textContent =
          notifications[
            notificationIndex %
            notifications.length
          ];


        notificationIndex++;


        notificationPopup.classList.add(
          "show"
        );


        setTimeout(
          function () {

            notificationPopup.classList.remove(
              "show"
            );

          },
          4000
        );

      }


      if (
        notificationPopup &&
        notificationMessage
      ) {

        showNotification();


        setInterval(
          showNotification,
          8000
        );

      }


      /* =======================================================
         PRODUCT GALLERY
      ======================================================= */

      const mainProductImage =
        getElement("mainProductImg");


      const thumbnails =
        document.querySelectorAll(
          ".thumb-img"
        );


      thumbnails.forEach(
        function (thumbnail) {

          thumbnail.addEventListener(
            "click",
            function () {


              thumbnails.forEach(
                function (item) {

                  item.classList.remove(
                    "active"
                  );

                }
              );


              thumbnail.classList.add(
                "active"
              );


              if (
                mainProductImage &&
                thumbnail.dataset.img
              ) {

                mainProductImage.src =
                  thumbnail.dataset.img;

              }

            }
          );

        }
      );


      /* =======================================================
         TAB SYSTEM
      ======================================================= */

      function activateTab(
        tabName
      ) {

        document
          .querySelectorAll(
            ".tab-btn"
          )
          .forEach(
            function (button) {
              button.classList.toggle(
                "active",
                button.dataset.tab === tabName
              );
            }
          );

        const targetPanel = document.querySelector(
          '.tab-panel[data-panel="' + tabName + '"]'
        );

        if (targetPanel) {
          targetPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }


      document
        .querySelectorAll(
          ".tab-btn"
        )
        .forEach(
          function (button) {

            button.addEventListener(
              "click",
              function () {

                activateTab(
                  button.dataset.tab
                );

              }
            );

          }
        );


      /* =======================================================
         BENEFITS NAVIGATION
      ======================================================= */

      document
        .querySelectorAll(
          'a[href="#benefits"]'
        )
        .forEach(
          function (link) {

            link.addEventListener(
              "click",
              function (event) {

                event.preventDefault();


                activateTab(
                  "benefits"
                );


                const tabsSection =
                  document.querySelector(
                    ".tabs-section"
                  );


                if (tabsSection) {

                  tabsSection.scrollIntoView(
                    {
                      behavior: "smooth",
                      block: "start"
                    }
                  );

                }

              }
            );

          }
        );


      /* =======================================================
         RING SIZE
      ======================================================= */

      function setSize(size) {

        selectedSize =
          size || "";


        document
          .querySelectorAll(
            ".size-btn"
          )
          .forEach(
            function (button) {

              button.classList.toggle(
                "active",
                button.dataset.size ===
                selectedSize
              );

            }
          );


        const sizeSelect =
          getElement(
            "orderSize"
          );


        if (sizeSelect) {

          sizeSelect.value =
            selectedSize;

        }

      }


      document
        .querySelectorAll(
          ".size-btn"
        )
        .forEach(
          function (button) {

            button.addEventListener(
              "click",
              function () {

                setSize(
                  button.dataset.size
                );

              }
            );

          }
        );


      const orderSizeSelect =
        getElement(
          "orderSize"
        );


      if (orderSizeSelect) {

        orderSizeSelect.addEventListener(
          "change",
          function (event) {

            setSize(
              event.target.value
            );

          }
        );

      }


      /* =======================================================
         QUANTITY SYSTEM
      ======================================================= */

      function updateQuantity() {

        const totalPrice =
          PRICE * quantity;


        const qtyNum =
          getElement("qtyNum");


        const formQty =
          getElement("formQty");


        const formQtyNum =
          getElement("formQtyNum");


        const productQtyPrice =
          getElement(
            "productQtyPrice"
          );


        const formPrice =
          getElement("formPrice");


        const formQtyTotal =
          getElement(
            "formQtyTotal"
          );


        const hiddenQuantity =
          getElement(
            "orderQuantity"
          );


        if (qtyNum) {

          qtyNum.textContent =
            bnNumber(quantity);

        }


        if (formQty) {

          formQty.textContent =
            bnNumber(quantity);

        }


        if (formQtyNum) {

          formQtyNum.textContent =
            bnNumber(quantity);

        }


        if (productQtyPrice) {

          productQtyPrice.textContent =
            "মোট: " +
            money(totalPrice);

        }


        if (formPrice) {

          formPrice.textContent =
            money(totalPrice);

        }


        if (formQtyTotal) {

          formQtyTotal.textContent =
            "মোট: " +
            money(totalPrice);

        }


        if (hiddenQuantity) {
          hiddenQuantity.value = String(quantity);
        }

        /* Keep every visible price in sync. */
        document.querySelectorAll(".js-price").forEach(function (el) {
          el.textContent = bnNumber(PRICE);
        });
        document.querySelectorAll(".product-price").forEach(function (el) {
          el.textContent = money(PRICE);
        });
        const heroPrice = document.querySelector(".price-new");
        if (heroPrice) heroPrice.textContent = money(PRICE);
        const ctaPrice = document.querySelector(".cta-new");
        if (ctaPrice) ctaPrice.textContent = money(PRICE);
        const previewPrice = document.querySelectorAll(".preview-price");
        previewPrice.forEach(function (el) {
          el.innerHTML = "৳ <span class=\"js-price\">" + bnNumber(PRICE) + "</span>";
        });
        const orderTotalInput = getElement("orderTotal");
        if (orderTotalInput) orderTotalInput.value = String(totalPrice);

      }


      document
        .querySelectorAll(
          "[data-qty]"
        )
        .forEach(
          function (button) {

            button.addEventListener(
              "click",
              function () {


                const change =
                  Number(
                    button.dataset.qty
                  );


                if (
                  Number.isNaN(change)
                ) {

                  return;

                }


                quantity += change;


                quantity =
                  Math.max(
                    MIN_QUANTITY,
                    quantity
                  );


                quantity =
                  Math.min(
                    MAX_QUANTITY,
                    quantity
                  );


                updateQuantity();

              }
            );

          }
        );


      updateQuantity();

      /* Make the free-gift card instantly understandable without another popup. */
      const freeGiftCard = getElement("freeGiftCard");
      if (freeGiftCard) {
        freeGiftCard.setAttribute("aria-label", "রুকাইয়া পানি ফ্রি গিফট");
      }


      /* =======================================================
         FAQ ACCORDION
      ======================================================= */

      document
        .querySelectorAll(
          ".faq-question"
        )
        .forEach(
          function (button) {

            button.addEventListener(
              "click",
              function () {


                const item =
                  button.closest(
                    ".faq-item"
                  );


                if (!item) {

                  return;

                }


                const wasOpen =
                  item.classList.contains(
                    "open"
                  );


                document
                  .querySelectorAll(
                    ".faq-item.open"
                  )
                  .forEach(
                    function (
                      openItem
                    ) {


                      openItem.classList.remove(
                        "open"
                      );


                      const openButton =
                        openItem.querySelector(
                          ".faq-question"
                        );


                      if (openButton) {

                        openButton.classList.add(
                          "collapsed"
                        );


                        openButton.setAttribute(
                          "aria-expanded",
                          "false"
                        );

                      }

                    }
                  );


                if (!wasOpen) {

                  item.classList.add(
                    "open"
                  );


                  button.classList.remove(
                    "collapsed"
                  );


                  button.setAttribute(
                    "aria-expanded",
                    "true"
                  );

                }

              }
            );

          }
        );


      /* =======================================================
         SUCCESS MESSAGE
      ======================================================= */

      function showOrderSuccess(
        orderId,
        orderData
      ) {


        const successMessage =
          getElement(
            "orderSuccessMessage"
          );


        const successOrderId =
          getElement(
            "successOrderId"
          );


        const successName =
          getElement(
            "successName"
          );


        const successName2 =
          getElement(
            "successName2"
          );


        const successPhone =
          getElement(
            "successPhone"
          );


        const successAddress =
          getElement(
            "successAddress"
          );


        const successQty =
          getElement(
            "successQty"
          );


        const successTotal =
          getElement(
            "successTotal"
          );


        const successSize =
          getElement(
            "successSize"
          );


        if (successOrderId) {

          successOrderId.textContent =
            "#" + orderId;

        }


        if (successName) {

          successName.textContent =
            orderData.name;

        }


        if (successName2) {

          successName2.textContent =
            orderData.name;

        }


        if (successPhone) {

          successPhone.textContent =
            orderData.phone;

        }


        if (successAddress) {

          successAddress.textContent =
            orderData.address;

        }


        if (successQty) {

          successQty.textContent =
            bnNumber(
              orderData.quantity
            );

        }


        if (successTotal) {

          successTotal.textContent =
            money(
              orderData.total
            );

        }


        if (successSize) {

          successSize.textContent =
            orderData.size ||
            "পরে জানাবেন";

        }


        if (successMessage) {

          successMessage.classList.remove(
            "d-none"
          );


          successMessage.scrollIntoView(
            {
              behavior: "smooth",
              block: "center"
            }
          );


        } else {

          alert(
            "আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!\n" +
            "Order ID: " +
            orderId
          );

        }

      }


      /* =======================================================
         ORDER SUBMISSION STATE
      ======================================================= */

      let orderBeingSubmitted =
        false;


      let currentOrderData =
        null;


      let currentOrderId =
        null;


      /* =======================================================
         RESET ORDER FORM
      ======================================================= */

      function resetOrderForm() {


        if (orderForm) {

          orderForm.reset();

        }


        quantity = 1;

        selectedSize = "";


        updateQuantity();

        setSize("");

      }


      /* =======================================================
         FINISH SUCCESS
      ======================================================= */

      function finishOrder() {


        if (
          !orderBeingSubmitted ||
          !currentOrderData ||
          !currentOrderId
        ) {

          return;

        }


        orderBeingSubmitted =
          false;


        const savedData =
          currentOrderData;


        const savedOrderId =
          currentOrderId;


        /* Save customer data */
        sessionStorage.setItem(
          "orderName",
          savedData.name
        );


        sessionStorage.setItem(
          "orderPhone",
          savedData.phone
        );


        sessionStorage.setItem(
          "orderAddress",
          savedData.address
        );


        sessionStorage.setItem(
          "orderQuantity",
          String(
            savedData.quantity
          )
        );


        sessionStorage.setItem(
          "orderSize",
          savedData.size
        );


        sessionStorage.setItem(
          "orderId",
          savedOrderId
        );


        /* Show success */
        showOrderSuccess(
          savedOrderId,
          savedData
        );


        /* Reset form */
        resetOrderForm();


        /* Reset button */
        if (submitButton) {

          submitButton.disabled =
            false;


          submitButton.innerHTML =
            '<i class="fas fa-check me-2"></i>' +
            "অর্ডার সম্পন্ন হয়েছে";

        }


        currentOrderData =
          null;


        currentOrderId =
          null;

      }


      /* =======================================================
         ORDER FORM SUBMIT
      ======================================================= */

      if (orderForm) {


        orderForm.addEventListener(
          "submit",
          function (event) {


            /*
             * IMPORTANT:
             * Stop normal page reload.
             */

            event.preventDefault();


            /* -----------------------------------------------
               HTML VALIDATION
            ------------------------------------------------ */

            if (
              !orderForm.checkValidity()
            ) {

              orderForm.reportValidity();

              return;

            }


            /* -----------------------------------------------
               GOOGLE URL CHECK
            ------------------------------------------------ */

            if (
              !GOOGLE_SCRIPT_URL ||
              !GOOGLE_SCRIPT_URL.includes(
                "script.google.com/macros"
              )
            ) {

              alert(
                "Google Apps Script URL সঠিক নয়।"
              );

              return;

            }


            /* -----------------------------------------------
               HONEYPOT
            ------------------------------------------------ */

            const honeypot =
              getElement("website");


            if (
              honeypot &&
              honeypot.value.trim() !== ""
            ) {

              return;

            }


            /* -----------------------------------------------
               PREVENT DOUBLE SUBMISSION
            ------------------------------------------------ */

            if (
              orderBeingSubmitted
            ) {

              return;

            }


            /* -----------------------------------------------
               GET FORM VALUES
            ------------------------------------------------ */

            const nameInput =
              getElement(
                "orderName"
              );


            const phoneInput =
              getElement(
                "orderPhone"
              );


            const addressInput =
              getElement(
                "orderAddress"
              );


            const sizeInput =
              getElement(
                "orderSize"
              );


            const quantityInput =
              getElement(
                "orderQuantity"
              );


            const name =
              nameInput
                ? nameInput.value.trim()
                : "";


            const phone =
              phoneInput
                ? phoneInput.value.trim()
                : "";


            const address =
              addressInput
                ? addressInput.value.trim()
                : "";


            const problemInput =
              getElement("orderProblem");

            const problem =
              problemInput
                ? problemInput.value.trim()
                : "";


            const size =
              sizeInput
                ? sizeInput.value
                : "";


            let orderQuantity =
              quantityInput
                ? Number(
                    quantityInput.value
                  )
                : quantity;


            if (
              !Number.isFinite(
                orderQuantity
              )
            ) {

              orderQuantity = 1;

            }


            orderQuantity =
              Math.max(
                MIN_QUANTITY,
                Math.min(
                  MAX_QUANTITY,
                  orderQuantity
                )
              );


            const total =
              PRICE *
              orderQuantity;


            /* -----------------------------------------------
               GENERATE ORDER ID
               SAME ID GOES TO SHEET + SUCCESS SCREEN
            ------------------------------------------------ */

            const orderId =
              "ORD-" +
              Date.now() +
              "-" +
              Math.floor(
                100 +
                Math.random() *
                900
              );


            /* -----------------------------------------------
               ORDER DATA
            ------------------------------------------------ */

            const orderData = {

              name: name,

              phone: phone,

              address: address,

              problem: problem,

              size: size,

              quantity:
                orderQuantity,

              total: total

            };


            currentOrderData =
              orderData;


            currentOrderId =
              orderId;


            orderBeingSubmitted =
              true;


            /* -----------------------------------------------
               ORDER ID HIDDEN FIELD
            ------------------------------------------------ */

            let orderIdInput =
              getElement(
                "orderIdInput"
              );


            if (!orderIdInput) {

              orderIdInput =
                document.createElement(
                  "input"
                );


              orderIdInput.type =
                "hidden";


              orderIdInput.id =
                "orderIdInput";


              orderIdInput.name =
                "orderId";


              orderForm.appendChild(
                orderIdInput
              );

            }


            orderIdInput.value =
              orderId;


            /* -----------------------------------------------
               TOTAL HIDDEN FIELD
            ------------------------------------------------ */

            let totalInput =
              getElement(
                "orderTotal"
              );


            if (!totalInput) {

              totalInput =
                document.createElement(
                  "input"
                );


              totalInput.type =
                "hidden";


              totalInput.id =
                "orderTotal";


              totalInput.name =
                "total";


              orderForm.appendChild(
                totalInput
              );

            }


            totalInput.value =
              String(total);


            /* -----------------------------------------------
               QUANTITY HIDDEN FIELD
            ------------------------------------------------ */

            if (quantityInput) {

              quantityInput.value =
                String(
                  orderQuantity
                );

            }


            /* -----------------------------------------------
               BUTTON LOADING
            ------------------------------------------------ */

            if (submitButton) {

              submitButton.disabled =
                true;


              submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin me-2"></i>' +
                "অর্ডার পাঠানো হচ্ছে...";

            }


            /* -----------------------------------------------
               ENSURE TARGET
            ------------------------------------------------ */

            orderForm.target =
              "orderSubmitFrame";


            orderForm.method =
              "POST";


            orderForm.action =
              GOOGLE_SCRIPT_URL;


            /* -----------------------------------------------
               SUBMIT DIRECTLY TO IFRAME
               NO FETCH
               NO PAGE RELOAD
            ------------------------------------------------ */

            try {

              orderForm.submit();

            } catch (error) {

              console.error(
                "Order Submit Error:",
                error
              );


              orderBeingSubmitted =
                false;


              currentOrderData =
                null;


              currentOrderId =
                null;


              if (submitButton) {

                submitButton.disabled =
                  false;


                submitButton.innerHTML =
                  '<i class="fas fa-paper-plane me-2"></i>' +
                  "অর্ডার নিশ্চিত করুন";

              }


              alert(
                "অর্ডার পাঠানো যায়নি। আবার চেষ্টা করুন।"
              );


              return;

            }


            /*
             * Apps Script request পাঠানোর জন্য একটু সময়।
             * Parent page reload হবে না।
             */

            setTimeout(
              function () {

                if (
                  orderBeingSubmitted
                ) {

                  finishOrder();

                }

              },
              3000
            );


          }
        );

      }




      /* =======================================================
         PAGE-LOAD OFFER OVERLAY
      ======================================================= */

      const offerModal =
        getElement("offerModal");

      const offerCloseBtn =
        getElement("offerCloseBtn");

      const offerContinueBtn =
        getElement("offerContinueBtn");

      const offerOrderBtn =
        getElement("offerOrderBtn");

      const offerReopenBtn =
        getElement("offerReopenBtn");

      const offerAddProductBtn =
        getElement("offerAddProductBtn");

      const offerExtraProduct =
        getElement("offerExtraProduct");

      const offerExtraCloseBtn =
        getElement("offerExtraCloseBtn");


      let offerHideTimer = null;

      function openOfferModal(autoHideMs = 7000) {

        if (!offerModal) {
          return;
        }

        if (offerHideTimer) {
          window.clearTimeout(offerHideTimer);
        }

        offerModal.classList.add("is-open");

        document.body.classList.add(
          "offer-modal-open"
        );

        if (offerReopenBtn) {
          offerReopenBtn.classList.add("is-hidden");
        }

        if (autoHideMs > 0) {
          offerHideTimer = window.setTimeout(
            closeOfferModal,
            autoHideMs
          );
        }

      }


      function closeOfferModal() {

        if (!offerModal) {
          return;
        }

        if (offerHideTimer) {
          window.clearTimeout(offerHideTimer);
          offerHideTimer = null;
        }

        offerModal.classList.remove(
          "is-open"
        );

        document.body.classList.remove(
          "offer-modal-open"
        );

        if (offerReopenBtn) {
          offerReopenBtn.classList.remove("is-hidden");
        }

      }


      if (offerModal) {

        window.setTimeout(
          function () {
            openOfferModal(8000);
          },
          450
        );

        window.setInterval(
          function () {
            if (!offerModal.classList.contains("is-open")) {
              openOfferModal(6500);
            }
          },
          45000
        );

      }


      if (offerCloseBtn) {

        offerCloseBtn.addEventListener(
          "click",
          closeOfferModal
        );

      }


      if (offerContinueBtn) {

        offerContinueBtn.addEventListener(
          "click",
          closeOfferModal
        );

      }


      if (offerModal) {

        const backdrop =
          offerModal.querySelector(
            "[data-offer-close]"
          );

        if (backdrop) {

          backdrop.addEventListener(
            "click",
            closeOfferModal
          );

        }

      }


      document.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Escape" &&
            offerModal &&
            offerModal.classList.contains(
              "is-open"
            )
          ) {

            closeOfferModal();

          }

        }
      );


      /* Main CTA closes modal first, then smooth-scrolls to order. */
      if (offerOrderBtn) {

        offerOrderBtn.addEventListener(
          "click",
          function () {

            closeOfferModal();

          }
        );

      }


      if (offerReopenBtn) {

        offerReopenBtn.addEventListener(
          "click",
          function () {
            openOfferModal(7000);
          }
        );

      }


      /* Optional second-product slot. */
      if (offerAddProductBtn) {

        offerAddProductBtn.addEventListener(
          "click",
          function () {

            if (!offerExtraProduct) {
              return;
            }

            offerExtraProduct.classList.toggle(
              "d-none"
            );

            const opened =
              !offerExtraProduct.classList.contains(
                "d-none"
              );

            offerAddProductBtn.innerHTML =
              opened
                ? '<i class="fas fa-minus me-2"></i>অতিরিক্ত পণ্যের জায়গা বন্ধ করুন'
                : '<i class="fas fa-plus me-2"></i>আরেকটি পণ্য যোগ করুন';

          }
        );

      }


      if (offerExtraCloseBtn) {

        offerExtraCloseBtn.addEventListener(
          "click",
          function () {

            if (!offerExtraProduct) {
              return;
            }

            offerExtraProduct.classList.add(
              "d-none"
            );

            if (offerAddProductBtn) {

              offerAddProductBtn.innerHTML =
                '<i class="fas fa-plus me-2"></i>আরেকটি পণ্য যোগ করুন';

            }

          }
        );

      }


      /* =======================================================
         SMOOTH SCROLL TO ORDER
      ======================================================= */

      document
        .querySelectorAll(
          'a[href="#order"]'
        )
        .forEach(
          function (link) {

            link.addEventListener(
              "click",
              function (event) {

                event.preventDefault();


                const orderSection =
                  getElement("order");


                if (orderSection) {

                  orderSection.scrollIntoView(
                    {
                      behavior: "smooth",
                      block: "start"
                    }
                  );

                }

              }
            );

          }
        );


    }

  );

})();