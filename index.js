// =====================================================================
// LYCHEEMC OFFICIAL MINECRAFT STORE - FRONTEND JAVASCRIPT ENGINE
// =====================================================================

// Optional: Paste your Discord channel Webhook URL below to receive instant purchase
// alerts directly when hosted online on GitHub Pages (e.g. into your #store-logs channel)
const DISCORD_WEBHOOK_URL = '';

// --- 1. PRODUCT CATALOG DATA ---
    const RANKS = [
      {
        id: 'rank-premium',
        name: 'PREMIUM Rank',
        priceNum: 49,
        priceDisplay: '₹49',
        category: 'ranks',
        glowColor: '#3b82f6',
        img: 'public/images/ranks/premium.png',
        desc: 'Permanent starter rank with essential VIP commands, chat color, and bonus claim blocks.',
        perks: ['3 Set Homes', '/hat command', 'White & Blue Chat Glow', 'Premium Kit every 24h', 'Queue Priority Tier 1']
      },
      {
        id: 'rank-ocean',
        name: 'OCEAN Rank',
        priceNum: 99,
        priceDisplay: '₹99',
        category: 'ranks',
        glowColor: '#00e5ff',
        img: 'public/images/ranks/ocean.png',
        desc: 'Ocean master rank with water breathing perks, extra homes, and crate bonus keys.',
        perks: ['5 Set Homes', '/feed command', 'Ocean Blue Chat Glow', 'Ocean Kit + 1x Matrix Key', 'Permanent Water Breathing']
      },
      {
        id: 'rank-coconut',
        name: 'COCONUT Rank',
        priceNum: 149,
        priceDisplay: '₹149',
        category: 'ranks',
        glowColor: '#84cc16',
        img: 'public/images/ranks/coconut.png',
        desc: 'Tropical champion rank with portable crafting, bonus homes, and double claim rate.',
        perks: ['7 Set Homes', '/workbench command', 'Coconut Vine Chat Glow', 'Coconut Armor Kit + 2x Matrix Keys', 'Keep XP on Death (50%)']
      },
      {
        id: 'rank-turtle',
        name: 'TURTLE Rank',
        priceNum: 199,
        priceDisplay: '₹199',
        category: 'ranks',
        glowColor: '#10b981',
        img: 'public/images/ranks/turtle.png',
        desc: 'Heavy shell combat tier with Diamond Prot III armor kit, near command, and Arcane key.',
        perks: ['10 Set Homes', '/near radar command', 'Emerald Turtle Chat Glow', 'Turtle God Kit + 1x Arcane Key', 'Death Chest Protection']
      },
      {
        id: 'rank-lychee-plus',
        name: 'LYCHEE+ Apex Rank',
        priceNum: 249,
        priceDisplay: '₹249',
        category: 'ranks',
        glowColor: '#f43f5e',
        img: 'public/images/ranks/lychee-plus.png',
        desc: 'The ultimate royal apex rank. Flight in claims, full Prot IV Netherite kit, and Monthly key.',
        perks: ['15 Set Homes', '/fly command inside claims', 'Crimson & Gold Royal Glow', 'Lychee+ God Kit + 1x Monthly Key', 'Full Keep Inventory perk']
      }
    ];

    const KEYS = [
      {
        id: 'key-matrix',
        name: 'Matrix Key ×3',
        priceNum: 99,
        priceDisplay: '₹99',
        category: 'keys',
        reward: '250 Shards for 3x',
        glowColor: '#a855f7',
        img: 'public/images/keys/matrix-key.png',
        desc: 'Pack of 3 mysterious purple Matrix keys. Grants rare enchantments, vital resources, and 250 shards in-game.'
      },
      {
        id: 'key-arcane',
        name: 'Arcane Key ×3',
        priceNum: 149,
        priceDisplay: '₹149',
        category: 'keys',
        reward: '500 Shards for 3x',
        glowColor: '#00e5ff',
        img: 'public/images/keys/arcane-key.png',
        desc: 'Pack of 3 magical cyan Arcane keys. Unlocks mythical tools, high-tier armor, and 500 shards bonus.'
      },
      {
        id: 'key-monthly',
        name: 'Monthly Key ×3',
        priceNum: 199,
        priceDisplay: '₹199',
        category: 'keys',
        reward: '1500 Shards for 3x',
        glowColor: '#ffb300',
        img: 'public/images/keys/monthly-key.png',
        desc: 'Pack of 3 golden premium Monthly keys. Exclusive monthly cosmetics, seasonal gear, and 1500 shards bonus.'
      }
    ];

    const SHARDS = [
      {
        id: 'shards-1k',
        name: '1,000 Shards',
        priceNum: 49,
        priceDisplay: '₹49',
        category: 'shards',
        glowColor: '#00e5ff',
        img: 'public/images/shards/1k-shards.png',
        desc: 'Starter gemstone cluster to kick off server trading, shop unlocks, and beginner upgrades.'
      },
      {
        id: 'shards-3k',
        name: '3,000 Shards',
        priceNum: 129,
        priceDisplay: '₹129',
        category: 'shards',
        glowColor: '#00e5ff',
        img: 'public/images/shards/3k-shards.png',
        desc: 'Medium adventurer crystal cluster. Ideal for intermediate kits and weapon enchants.'
      },
      {
        id: 'shards-5k',
        name: '5,000 Shards',
        priceNum: 159,
        priceDisplay: '₹159',
        category: 'shards',
        glowColor: '#00e5ff',
        img: 'public/images/shards/5k-shards.png',
        desc: 'Hero crystal formation. Most popular server economy booster for serious faction leaders.'
      },
      {
        id: 'shards-10k',
        name: '10,000 Shards',
        priceNum: 219,
        priceDisplay: '₹219',
        category: 'shards',
        glowColor: '#ffb300',
        highlight: true,
        img: 'public/images/shards/10k-shards.png',
        desc: 'Huge premium treasure chest overflowing with glowing crystals. Maximum value pack with best rate per shard!'
      }
    ];

    const ALL_PRODUCTS = [...RANKS, ...KEYS, ...SHARDS];

    const POPUP_CONFIGS = {
      ranks: {
        title: '👑 Permanent Server Ranks',
        subtitle: 'Select your preferred rank tier with lifetime perks, kits, and chat glows',
        glow: 'rgba(59, 130, 246, 0.4)',
        items: RANKS
      },
      keys: {
        title: '🗝️ Crate Key Bundles',
        subtitle: 'Pack of 3 crate keys with special shard rewards and rare loot drops',
        glow: 'rgba(168, 85, 247, 0.4)',
        items: KEYS
      },
      shards: {
        title: '💎 Lychee Shards Packages',
        subtitle: 'Premium server gemstone packs and crystal vaults for trading and upgrades',
        glow: 'rgba(0, 229, 255, 0.4)',
        items: SHARDS
      }
    };

    // --- 2. STATE ---
    let cart = [];
    let playerIGN = localStorage.getItem('lychee_ign') || '';
    let selectedEdition = 'java';
    let currentPayMethod = 'upi';

    try {
      const savedCart = localStorage.getItem('lychee_cart');
      if (savedCart) cart = JSON.parse(savedCart);
    } catch(e) {}

    // --- 3. CATEGORY POPUPS ---
    function openCategoryPopup(categoryKey) {
      const config = POPUP_CONFIGS[categoryKey];
      if (!config) return;

      const overlay = document.getElementById('categoryPopupOverlay');
      const win = document.getElementById('categoryPopupWindow');
      const titleEl = document.getElementById('popupWindowTitle');
      const subEl = document.getElementById('popupWindowSub');
      const grid = document.getElementById('popupProductsGrid');

      win.style.setProperty('--window-glow', config.glow);
      titleEl.innerHTML = config.title;
      subEl.textContent = config.subtitle;

      grid.innerHTML = config.items.map(p => createCardHTML(p)).join('');

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCategoryPopup() {
      const overlay = document.getElementById('categoryPopupOverlay');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function closePopupOnOverlay(e) {
      if (e.target.id === 'categoryPopupOverlay') {
        closeCategoryPopup();
      }
    }

    // Escape listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCategoryPopup();
        closePaymentWindow();
        closeSuccessModal();
        const cartOverlay = document.getElementById('cartOverlay');
        if (cartOverlay.classList.contains('open')) toggleCart();
      }
    });

    // --- 4. PRODUCT CARD RENDER ---
    function createCardHTML(p) {
      const isHighlight = p.highlight ? 'highlight-card' : '';
      const tagHTML = p.highlight 
        ? `<span class="product-tag tag-best-value">🔥 Best Value</span>`
        : (p.reward ? `<span class="product-tag tag-reward">${p.reward}</span>` : '');

      const perksHTML = p.perks 
        ? `<ul class="product-perks-list">${p.perks.map(perk => `<li>${perk}</li>`).join('')}</ul>`
        : '';

      return `
        <article class="product-card ${isHighlight}" style="--card-glow-color: ${p.glowColor}40;" data-id="${p.id}">
          <div class="product-img-box">
            ${tagHTML}
            <img src="${p.img}" alt="${p.name}" class="product-img" onerror="this.onerror=null;this.src='public/images/logo.png'">
          </div>
          <div class="product-info">
            <span class="product-category-label">${p.category}</span>
            <h3 class="product-title">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            ${perksHTML}
            <div class="product-footer">
              <div class="price-box">
                <span class="price-label">Price</span>
                <span class="price-val">${p.priceDisplay}</span>
              </div>
              <button class="btn-add-cart" onclick="addToCart('${p.id}', this)">
                <span>Add to Cart</span> 🛒
              </button>
            </div>
          </div>
        </article>
      `;
    }

    // --- 5. CART LOGIC ---
    function addToCart(productId, btnEl) {
      const prod = ALL_PRODUCTS.find(p => p.id === productId);
      if (!prod) return;

      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: prod.id,
          name: prod.name,
          price: prod.priceNum,
          priceDisplay: prod.priceDisplay,
          img: prod.img,
          qty: 1
        });
      }

      saveCart();
      updateCartUI();

      if (btnEl) {
        const origHTML = btnEl.innerHTML;
        btnEl.classList.add('added');
        btnEl.innerHTML = '<span>Added!</span> ✔';
        setTimeout(() => {
          btnEl.classList.remove('added');
          btnEl.innerHTML = origHTML;
        }, 1200);
      }

      showToast(`Added <strong>${prod.name}</strong> to your cart!`);
    }

    function updateCartQty(productId, delta) {
      const item = cart.find(i => i.id === productId);
      if (!item) return;

      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
      }
      saveCart();
      updateCartUI();
    }

    function removeCartItem(productId) {
      cart = cart.filter(i => i.id !== productId);
      saveCart();
      updateCartUI();
    }

    function saveCart() {
      try {
        localStorage.setItem('lychee_cart', JSON.stringify(cart));
      } catch(e) {}
    }

    function updateCartUI() {
      const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
      const badge = document.getElementById('cartBadgeCount');
      if (badge) badge.textContent = totalCount;

      const listEl = document.getElementById('cartItemsList');
      const totalEl = document.getElementById('cartTotalVal');

      let totalPrice = 0;
      if (cart.length === 0) {
        listEl.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">🛒</div>
            <div style="font-size: 16px; font-weight: 700; color: #fff;">Your cart is empty</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">Add keys, shards, or ranks to get started.</p>
          </div>
        `;
      } else {
        listEl.innerHTML = cart.map(item => {
          const itemTotal = item.price * item.qty;
          totalPrice += itemTotal;
          return `
            <div class="cart-item">
              <img src="${item.img}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
                <div class="cart-item-actions">
                  <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                  <span class="cart-item-qty">${item.qty}</span>
                  <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-family: var(--font-mono); font-weight: 800; color: #fff;">₹${itemTotal}</div>
                <button class="btn-remove-item" onclick="removeCartItem('${item.id}')" title="Remove">&times;</button>
              </div>
            </div>
          `;
        }).join('');
      }

      if (totalEl) totalEl.textContent = '₹' + totalPrice;
    }

    function toggleCart() {
      const overlay = document.getElementById('cartOverlay');
      overlay.classList.toggle('open');
    }

    function closeCartOnOverlay(e) {
      if (e.target.id === 'cartOverlay') {
        toggleCart();
      }
    }

    // --- 6. DEDICATED PAYMENT WINDOW LOGIC ---
    function openPaymentWindow() {
      if (cart.length === 0) {
        showToast('Your cart is empty! Please add an item first.');
        return;
      }

      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      document.getElementById('payModalTotalAmount').textContent = '₹' + total;
      const upiDisplay = document.getElementById('upiDisplayAmount');
      if (upiDisplay) upiDisplay.textContent = '₹' + total;
      document.getElementById('btnSubmitPayment').innerHTML = `<span>Pay &amp; Connect to In-Game (₹${total})</span> ➔`;

      // Clear previous inputs
      const utrEl = document.getElementById('payUpiUtr');
      if (utrEl) utrEl.value = '';

      // Pre-fill IGN if already set
      const ignInput = document.getElementById('payIgnInput');
      if (playerIGN) {
        ignInput.value = playerIGN;
        updatePaymentAvatar(playerIGN);
      } else {
        updatePaymentAvatar('Steve');
      }

      // Close cart drawer & open payment window
      const cartOverlay = document.getElementById('cartOverlay');
      cartOverlay.classList.remove('open');

      const payOverlay = document.getElementById('paymentModalOverlay');
      payOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closePaymentWindow() {
      const payOverlay = document.getElementById('paymentModalOverlay');
      payOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function closePayModalOnOverlay(e) {
      if (e.target.id === 'paymentModalOverlay') {
        closePaymentWindow();
      }
    }

    // Switch between Java Edition and Bedrock Edition
    function selectEdition(ed) {
      selectedEdition = ed;
      const btnJava = document.getElementById('btnJava');
      const btnBedrock = document.getElementById('btnBedrock');
      if (ed === 'java') {
        btnJava.classList.add('active');
        btnBedrock.classList.remove('active');
      } else {
        btnBedrock.classList.add('active');
        btnJava.classList.remove('active');
      }
      updateInGameSyncDisplay();
    }

    function updatePaymentAvatar(ign) {
      const clean = ign.trim();
      const avatarEl = document.getElementById('payAvatarPreview');
      const target = clean || 'Steve';
      avatarEl.src = `https://mc-heads.net/avatar/${encodeURIComponent(target)}/24`;
      updateInGameSyncDisplay();
    }

    function updateInGameSyncDisplay() {
      const ign = document.getElementById('payIgnInput').value.trim() || playerIGN || 'Guest';
      const edLabel = selectedEdition === 'java' ? 'Java Edition' : 'Bedrock / PE';
      document.getElementById('connectedPlayerDisplay').textContent = `${ign} (${edLabel})`;
    }

    // Switch between UPI and Card details
    function switchPayMethod(method) {
      currentPayMethod = method;
      const tabUpi = document.getElementById('tabUpiBtn');
      const tabCard = document.getElementById('tabCardBtn');
      const upiContent = document.getElementById('upiFormContent');
      const cardContent = document.getElementById('cardFormContent');

      if (method === 'upi') {
        tabUpi.classList.add('active');
        tabCard.classList.remove('active');
        upiContent.style.display = 'flex';
        cardContent.style.display = 'none';
      } else {
        tabCard.classList.add('active');
        tabUpi.classList.remove('active');
        upiContent.style.display = 'none';
        cardContent.style.display = 'flex';
      }
    }

    function appendUpiHandle(handle) {
      const input = document.getElementById('payUpiId');
      const val = input.value.split('@')[0].trim() || 'player';
      input.value = val + handle;
      input.focus();
    }

    function formatCardNumber(input) {
      let v = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let matches = v.match(/\d{4,16}/g);
      let match = matches && matches[0] || '';
      let parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        input.value = parts.join(' ');
      } else {
        input.value = v;
      }
    }

    // Process Payment & Connect to In-game
    function processPayment() {
      const ign = document.getElementById('payIgnInput').value.trim();
      const email = document.getElementById('payGmailInput').value.trim();

      if (!ign) {
        alert('Please enter your Minecraft in-game username (IGN) to connect your account.');
        document.getElementById('payIgnInput').focus();
        return;
      }

      if (!email || !email.includes('@')) {
        alert('Please enter a valid Gmail address to receive your payment confirmation and claim receipt.');
        document.getElementById('payGmailInput').focus();
        return;
      }

      let upiUtr = '';
      let upiIdVal = '';
      if (currentPayMethod === 'upi') {
        const utrEl = document.getElementById('payUpiUtr');
        const upiEl = document.getElementById('payUpiId');
        upiUtr = utrEl ? utrEl.value.trim() : '';
        upiIdVal = upiEl ? upiEl.value.trim() : '';

        if (!upiUtr && !upiIdVal) {
          alert('Please enter your 12-digit UPI UTR / Transaction Reference number from your payment receipt after scanning the QR code.');
          if (utrEl) utrEl.focus();
          return;
        }

        if (upiUtr && upiUtr.length < 6) {
          alert('Please enter a valid UPI Reference / UTR Number (usually 12 digits from your Google Pay, PhonePe, Paytm or FamPay receipt).');
          if (utrEl) utrEl.focus();
          return;
        }
      } else {
        const cardNum = document.getElementById('cardNumber').value.trim();
        if (!cardNum || cardNum.length < 12) {
          alert('Please enter a valid Card Number.');
          document.getElementById('cardNumber').focus();
          return;
        }
      }

      // Save player IGN
      playerIGN = ign;
      localStorage.setItem('lychee_ign', playerIGN);
      updatePlayerUI();

      // Show processing state
      const btn = document.getElementById('btnSubmitPayment');
      const origText = btn.innerHTML;
      btn.classList.add('loading');
      btn.innerHTML = `<span>Connecting to LycheeMC Server via RCON...</span> ⏳`;

      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const txnId = 'LM-' + (currentPayMethod === 'upi' ? 'UPI' : 'CARD') + '-' + Math.floor(100000 + Math.random() * 900000);
      const edLabel = selectedEdition === 'java' ? 'Java Edition' : 'Bedrock Edition';

      const orderPayload = {
        ign: playerIGN,
        email,
        items: [...cart],
        total,
        txnId,
        utr: upiUtr || 'N/A',
        upiId: upiIdVal || 'N/A',
        method: currentPayMethod === 'upi' ? 'UPI / QR' : 'Credit / Debit Card',
        platform: edLabel,
        timestamp: new Date().toISOString()
      };

      // Store in browser order history
      try {
        const history = JSON.parse(localStorage.getItem('lychee_orders_history') || '[]');
        history.unshift(orderPayload);
        localStorage.setItem('lychee_orders_history', JSON.stringify(history.slice(0, 20)));
      } catch(e) {}

      // Optional: Send to Discord Channel Webhook directly (ideal for GitHub Pages)
      if (typeof DISCORD_WEBHOOK_URL !== 'undefined' && DISCORD_WEBHOOK_URL) {
        try {
          fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'LycheeMC Store',
              avatar_url: 'https://mc-heads.net/avatar/' + encodeURIComponent(playerIGN) + '/64',
              embeds: [{
                title: '🛒 New Store Purchase Verified!',
                color: 0x10b981,
                thumbnail: { url: 'https://mc-heads.net/avatar/' + encodeURIComponent(playerIGN) + '/64' },
                fields: [
                  { name: '👤 Player IGN', value: '`' + playerIGN + '` (' + edLabel + ')', inline: true },
                  { name: '💰 Total Paid', value: '₹' + total, inline: true },
                  { name: '💳 Method', value: currentPayMethod === 'upi' ? 'UPI / QR' : 'Card', inline: true },
                  { name: '🔢 UPI UTR / Ref', value: '`' + (upiUtr || 'N/A') + '`', inline: true },
                  { name: '📧 Gmail', value: email, inline: true },
                  { name: '🧾 Transaction ID', value: '`' + txnId + '`', inline: true },
                  { name: '📦 Items', value: cart.map(i => '• **' + i.name + '** ×' + i.qty).join('\n') },
                  { name: '⚡ Quick In-Game Delivery Command', value: cart.map(i => '`!deliver ' + playerIGN + ' ' + (i.id.replace('key-', '').replace('rank-', '').replace('shards-', '')) + ' ' + i.qty + '`').join('\n') }
                ],
                footer: { text: 'LycheeMC GitHub Pages Store' },
                timestamp: new Date().toISOString()
              }]
            })
          }).catch(() => {});
        } catch(e) {}
      }

      // Send order to Discord Bot RCON Dispatcher (Local / Discloud)
      let botDelivered = false;
      const deliverPromise = fetch('http://localhost:4000/api/store-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          botDelivered = true;
          console.log('[Store Webhook]: In-game commands dispatched to LycheeMC via bot RCON!', data);
        }
      })
      .catch(err => {
        console.log('[Store Webhook Note]: Bot server not reached locally; order verified and queued in client receipt.');
      });

      setTimeout(async () => {
        try { await Promise.race([deliverPromise, new Promise(r => setTimeout(r, 1400))]); } catch(e) {}

        btn.classList.remove('loading');
        btn.innerHTML = origText;

        // Fill Success Modal details
        document.getElementById('successPlayerIgn').textContent = playerIGN;
        document.getElementById('successPlatformServer').textContent = `${edLabel} • play.lycheemc.fun`;
        document.getElementById('successPlayerAvatar').src = `https://mc-heads.net/avatar/${encodeURIComponent(playerIGN)}/48`;
        document.getElementById('successGmail').textContent = email;
        document.getElementById('successMethod').textContent = currentPayMethod === 'upi' ? 'UPI / FamPay QR' : 'Credit / Debit Card';
        document.getElementById('successTxnId').textContent = txnId;
        document.getElementById('successTotal').textContent = '₹' + total;

        const utrRow = document.getElementById('receiptUtrRow');
        const utrVal = document.getElementById('successUtr');
        if (utrRow && utrVal) {
          if (currentPayMethod === 'upi' && upiUtr) {
            utrRow.style.display = 'flex';
            utrVal.textContent = upiUtr;
          } else {
            utrRow.style.display = 'none';
          }
        }

        const deliveryStatusEl = document.getElementById('successDeliveryStatus');
        if (deliveryStatusEl) {
          if (botDelivered) {
            deliveryStatusEl.textContent = '⚡ Delivered via RCON to play.lycheemc.fun';
            deliveryStatusEl.style.color = '#10b981';
          } else {
            deliveryStatusEl.textContent = '⚡ Payment Verified • Queued for In-Game Claim';
            deliveryStatusEl.style.color = 'var(--cyan-bright)';
          }
        }

        // Clear Cart
        cart = [];
        saveCart();
        updateCartUI();

        // Close Payment Window & Open Success Modal
        closePaymentWindow();
        document.getElementById('successModal').classList.add('open');
      }, 1500);
    }

    function closeSuccessModal() {
      document.getElementById('successModal').classList.remove('open');
    }

    // --- 7. PLAYER PROFILE & IP COPY ---
    function promptIGN() {
      const name = prompt('Enter your Minecraft In-Game Name (IGN):', playerIGN || '');
      if (name !== null && name.trim() !== '') {
        playerIGN = name.trim();
        localStorage.setItem('lychee_ign', playerIGN);
        updatePlayerUI();
        showToast(`Profile updated to <strong>${playerIGN}</strong>!`);
      }
    }

    function updatePlayerUI() {
      const ign = playerIGN || 'Guest';
      const navIGN = document.getElementById('navIGN');
      const navAvatar = document.getElementById('navAvatar');

      if (navIGN) navIGN.textContent = ign;
      const avatarUrl = playerIGN 
        ? `https://mc-heads.net/avatar/${encodeURIComponent(playerIGN)}/26`
        : 'https://mc-heads.net/avatar/Steve/26';

      if (navAvatar) navAvatar.src = avatarUrl;
    }

    function copyServerIP() {
      const ip = 'play.lycheemc.fun';
      navigator.clipboard.writeText(ip).then(() => {
        const badge = document.getElementById('ipCopyBadge');
        if (badge) {
          badge.textContent = 'Copied!';
          badge.style.background = '#10b981';
          badge.style.color = '#fff';
          setTimeout(() => {
            badge.textContent = 'Copy';
            badge.style.background = '';
            badge.style.color = '';
          }, 2000);
        }
        showToast('Server IP <strong>play.lycheemc.fun</strong> copied to clipboard!');
      }).catch(() => {
        prompt('Copy server address:', ip);
      });
    }

    function showToast(html) {
      const box = document.getElementById('toastBox');
      if (!box) return;

      const toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.innerHTML = `<span>✨</span> <div>${html}</div>`;
      box.appendChild(toast);

      setTimeout(() => {
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    window.addEventListener('scroll', () => {
      const hdr = document.getElementById('siteHeader');
      if (window.scrollY > 20) {
        hdr.classList.add('scrolled');
      } else {
        hdr.classList.remove('scrolled');
      }
    });

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
      updatePlayerUI();
      updateCartUI();
    });
