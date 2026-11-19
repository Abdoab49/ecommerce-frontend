
import React, { useEffect, useRef } from "react";
import "./Offcut.css";

const SPRITE = "/Assets/offcut/1.png";

const PRODUCTS = [
  { name: "Nike Essential T-Shirt", price: "€38" },
  { name: "Nike Full-Zip Hoodie", price: "€85" },
  { name: "Nike SB Pullover Hoodie", price: "€95" },
  { name: "Nike Training T-Shirt", price: "€42" },
];

export default function Offcut() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const art = root.querySelector("#art");
    const rack = root.querySelector("#rack");
    const cap = root.querySelector("#cap");
    const capName = cap.querySelector("b");
    const capPrice = cap.querySelector("span");

    const big = root.querySelector("#big");
    const big2 = root.querySelector("#big2");

    const num = root.querySelector("#num");
    const name = root.querySelector("#name");
    const price = root.querySelector("#price");

    const total = PRODUCTS.length;
    const itemWidth = 260;
    const itemHeight = 329;
    const centers = [210, 570, 930, 1290];

    const garments = [];

    let hovered = -1;
    let opened = -1;
    let closeTimer;

    function fit() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const scale = Math.min(
        width / 1500,
        height / 1000
      );

      art.style.transform = `scale(${scale})`;
      art.style.left = `${(width - 1500 * scale) / 2}px`;
      art.style.top = `${(height - 1000 * scale) / 2}px`;
    }

    function paint(element, index) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      element.style.backgroundImage = `url("${SPRITE}")`;
      element.style.backgroundRepeat = "no-repeat";
      element.style.backgroundSize = `${width * total}px ${height}px`;
      element.style.backgroundPosition = `${-index * width}px 0`;
      element.style.clipPath = "none";
    }

    function layout() {
      garments.forEach((garment, index) => {
        let x = centers[index];

        if (hovered !== -1 && index !== hovered) {
          x += Math.sign(index - hovered) * 35;
        }

        garment.style.left = `${x}px`;
        garment.classList.toggle("face", index === hovered);
      });

      if (hovered >= 0) {
        cap.style.left = `${centers[hovered]}px`;
        capName.textContent = PRODUCTS[hovered].name;
        capPrice.textContent = PRODUCTS[hovered].price;
        cap.classList.add("on");
      } else {
        cap.classList.remove("on");
      }
    }

    function fill(index) {
      num.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

      name.textContent = PRODUCTS[index].name;
      price.textContent = PRODUCTS[index].price;
    }

    function openProduct(index) {
      if (opened >= 0) return;

      clearTimeout(closeTimer);

      opened = index;
      hovered = index;

      layout();
      fill(index);

      paint(big, index);

      root.classList.add("open");

      big.style.width = "420px";
      big.style.height = "532px";
      big.style.marginLeft = "-210px";
      big.style.top = "205px";
      big.style.left = "50%";

      big.animate(
        [
          {
            transform: `translateX(${centers[index] - 750}px) scale(.55)`,
            opacity: 0,
          },
          {
            transform: "translateX(0) scale(1)",
            opacity: 1,
          },
        ],
        {
          duration: 650,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "forwards",
        }
      );

      garments[index].style.visibility = "hidden";
    }

    function step(direction) {
      if (opened < 0) return;

      const previous = opened;

      opened = (opened + direction + total) % total;

      fill(opened);

      garments[previous].style.visibility = "";
      garments[opened].style.visibility = "hidden";

      hovered = opened;
      layout();

      paint(big2, previous);
      paint(big, opened);

      big2.style.width = "420px";
      big2.style.height = "532px";
      big2.style.marginLeft = "-210px";
      big2.style.top = "205px";

      big.style.width = "420px";
      big.style.height = "532px";
      big.style.marginLeft = "-210px";
      big.style.top = "205px";

      big2.getAnimations().forEach((animation) => animation.cancel());
      big.getAnimations().forEach((animation) => animation.cancel());

      big2.animate(
        [
          { opacity: 1, transform: "translateX(0)" },
          {
            opacity: 0,
            transform: `translateX(${-direction * 100}px)`,
          },
        ],
        {
          duration: 350,
          easing: "ease",
        }
      );

      big.animate(
        [
          {
            opacity: 0,
            transform: `translateX(${direction * 100}px)`,
          },
          { opacity: 1, transform: "translateX(0)" },
        ],
        {
          duration: 450,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "forwards",
        }
      );
    }

    function closeProduct() {
      if (opened < 0) return;

      const index = opened;

      root.classList.remove("open");

      closeTimer = window.setTimeout(() => {
        garments[index].style.visibility = "";

        big.getAnimations().forEach((animation) => animation.cancel());

        big.style.opacity = "0";
        big.style.transform = "";

        opened = -1;
        hovered = -1;

        layout();
      }, 650);
    }

    PRODUCTS.forEach((product, index) => {
      const garment = document.createElement("div");
      const image = document.createElement("i");

      garment.className = "g";
      garment.style.width = `${itemWidth}px`;
      garment.style.height = `${itemHeight}px`;
      garment.style.marginLeft = `${-itemWidth / 2}px`;
      garment.style.top = "220px";

      image.style.width = "100%";
      image.style.height = "100%";

      garment.appendChild(image);
      rack.appendChild(garment);

      paint(image, index);

      garment.addEventListener("pointerenter", () => {
        if (opened >= 0) return;

        hovered = index;
        layout();
      });

      garment.addEventListener("click", () => {
        openProduct(index);
      });

      garments.push(garment);
    });

    const track = root.querySelector("#track");

    for (let repeat = 0; repeat < 12; repeat++) {
      ["OFFCUT", "•", "LIMITED RUN", "•", "NO RESTOCKS", "•"].forEach(
        (word) => {
          const span = document.createElement("span");
          span.textContent = word;
          track.appendChild(span);
        }
      );
    }

    rack.addEventListener("pointerleave", () => {
      if (opened >= 0) return;

      hovered = -1;
      layout();
    });

    root.querySelector("#prev").addEventListener("click", () => {
      step(-1);
    });

    root.querySelector("#next").addEventListener("click", () => {
      step(1);
    });

    root.querySelector("#close").addEventListener("click", closeProduct);

    root.querySelector(".hit").addEventListener("click", closeProduct);

    const onKeyDown = (event) => {
      if (opened >= 0) {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "Escape") closeProduct();
        return;
      }

      if (event.key === "ArrowRight") {
        hovered = hovered < 0 ? 0 : Math.min(total - 1, hovered + 1);
        layout();
      }

      if (event.key === "ArrowLeft") {
        hovered = hovered < 0 ? total - 1 : Math.max(0, hovered - 1);
        layout();
      }

      if (event.key === "Enter" && hovered >= 0) {
        openProduct(hovered);
      }
    };

    window.addEventListener("resize", fit);
    window.addEventListener("keydown", onKeyDown);

    window.__closet = {
      openProduct,
      closeProduct,
      step,
    };

    fit();
    layout();

    return () => {
      clearTimeout(closeTimer);
      window.removeEventListener("resize", fit);
      window.removeEventListener("keydown", onKeyDown);

      delete window.__closet;
    };
  }, []);

  return (
    <main className="offcut-page" ref={rootRef}>
      <div id="art">
        <div id="about" className="ui dim">About</div>

        <div id="logo" className="dim">Offcut</div>

        <div id="contact" className="ui dim dimmer">Contact</div>

        <div id="rail" className="dim"></div>

        <div id="rack" className="dim"></div>

        <div id="cap" className="dimmer">
          <b></b>
          <span></span>
        </div>

        <button id="avail" className="pill ui dim dimmer">
          See availability
        </button>

        <div id="band" className="dimmer">
          <div id="track"></div>
        </div>

        <div id="det">
          <div className="hit"></div>

          <div id="big2"></div>
          <div id="big"></div>

          <button id="prev" className="arr" aria-label="Previous">
            <svg viewBox="0 0 24 24">
              <path d="M15 5L8 12L15 19" />
            </svg>
          </button>

          <button id="next" className="arr" aria-label="Next">
            <svg viewBox="0 0 24 24">
              <path d="M9 5L16 12L9 19" />
            </svg>
          </button>

          <div id="info">
            <div id="num"></div>
            <div id="name"></div>
            <div id="price"></div>

            <button className="pill ui">
              See availability
            </button>
          </div>

          <button id="close" className="ui">
            Close
          </button>
        </div>
      </div>
    </main>
  );
}
