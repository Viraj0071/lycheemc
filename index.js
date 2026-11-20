// =====================================================================
// LYCHEEMC OFFICIAL MINECRAFT STORE - FRONTEND JAVASCRIPT ENGINE
// =====================================================================

// Optional: Paste your Discord channel Webhook URL below to receive instant purchase
// alerts directly when hosted online on GitHub Pages (e.g. into your #store-logs channel)
const DISCORD_WEBHOOK_URL = '';

// --- 0. MULTI-CURRENCY CONVERSION & TRANSLATOR ENGINE ---
const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1.0, flag: '🇮🇳', name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, flag: '🇺🇸', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, flag: '🇪🇺', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0095, flag: '🇬🇧', name: 'British Pound' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044, flag: '🇦🇪', name: 'UAE Dirham' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 0.016, flag: '🇨🇦', name: 'Canadian Dollar' }
};

let currentCurrency = localStorage.getItem('lycheemc_currency') || 'INR';

function formatPrice(inrAmount) {
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.INR;
  if (curr.code === 'INR') {
    return '₹' + inrAmount;
  }
  const converted = (inrAmount * curr.rate).toFixed(2);
  return curr.symbol + converted;
}

function toggleCurrencyDropdown() {
  const wrap = document.getElementById('currencyDropdownWrap');
  if (wrap) wrap.classList.toggle('open');
}

function closeCurrencyDropdown() {
  const wrap = document.getElementById('currencyDropdownWrap');
  if (wrap) wrap.classList.remove('open');
}

function selectCurrency(code) {
  if (!CURRENCIES[code]) return;
  currentCurrency = code;
  localStorage.setItem('lycheemc_currency', code);
  updateCurrencyUI();
  refreshPricesOnPage();
  closeCurrencyDropdown();
  showToast(`Currency updated to ${CURRENCIES[code].name} (${CURRENCIES[code].symbol.trim()})`);
}

function updateCurrencyUI() {
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.INR;
  const flagEl = document.getElementById('currSelectedFlag');
  const codeEl = document.getElementById('currSelectedCode');
  const symbolEl = document.getElementById('currSelectedSymbol');

  if (flagEl) flagEl.textContent = curr.flag;
  if (codeEl) codeEl.textContent = curr.code;
  if (symbolEl) symbolEl.textContent = `(${curr.symbol.trim()})`;

  document.querySelectorAll('.currency-opt').forEach(opt => {
    if (opt.getAttribute('data-curr') === currentCurrency) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

function refreshPricesOnPage() {
  // Re-render open popup if open
  if (currentOpenCategory) {
    const config = POPUP_CONFIGS[currentOpenCategory];
    const grid = document.getElementById('popupProductsGrid');
    if (config && grid) {
      grid.innerHTML = config.items.map(p => createCardHTML(p)).join('');
    }
  }

  // Update portal card subtitle descriptions
  const ranksPortalSub = document.querySelector('.portal-ranks .portal-desc');
  if (ranksPortalSub) {
    ranksPortalSub.textContent = `Unlock lifetime perks, kits, chat glows, commands, and extra set homes starting from ${formatPrice(49)}.`;
  }

  // Update cart UI
  updateCartUI();

  // Update payment modal if open
  const payOverlay = document.getElementById('paymentModalOverlay');
  if (payOverlay && payOverlay.classList.contains('open')) {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const payTotalEl = document.getElementById('payModalTotalAmount');
    if (payTotalEl) {
      payTotalEl.textContent = currentCurrency === 'INR' ? `₹${total}` : `${formatPrice(total)} (~ ₹${total} INR)`;
    }
    const btnSubmit = document.getElementById('btnSubmitPayment');
    if (btnSubmit) {
      btnSubmit.innerHTML = `<span>Pay &amp; Connect to In-Game (${formatPrice(total)})</span> ➔`;
    }
  }
}

// Helper to reliably resolve base64 or local image
function getProductImg(p) {
  if (typeof window !== 'undefined' && window.LM_IMGS && p.assetKey && window.LM_IMGS[p.assetKey]) {
    return window.LM_IMGS[p.assetKey];
  }
  return p.img || (window.LM_IMGS && window.LM_IMGS['logo.png']) || 'public/images/logo.png';
}

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
    assetKey: 'ranks/premium.png',
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
    assetKey: 'ranks/ocean.png',
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
    assetKey: 'ranks/coconut.png',
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
    assetKey: 'ranks/turtle.png',
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
    assetKey: 'ranks/lychee-plus.png',
    highlight: true,
    desc: 'The ultimate royal apex rank. Flight in claims, full Prot IV Netherite kit, and Monthly key.',
    perks: ['15 Set Homes', '/fly command inside claims', 'Crimson & Gold Royal Glow', 'Lychee+ God Kit + 1x Monthly Key', 'Full Keep Inventory perk']
  }
];

const KEYS = [
  {
    id: 'key-matrix',
    name: 'Matrix Crate Key',
    priceNum: 49,
    priceDisplay: '₹49',
    category: 'keys',
    glowColor: '#00e5ff',
    img: 'public/images/keys/matrix-key.png',
    assetKey: 'keys/matrix-key.png',
    reward: '1x Key + 250 Shards',
    desc: 'High-tech mystery crate key unlocking enchanted gear, cosmetic tags, and currency rewards.',
    perks: ['1x Matrix Crate Key', 'Guaranteed +250 Bonus Shards', 'Unlocks Cyber Gear & Glow Tags', 'Instant Delivery to Inventory']
  },
  {
    id: 'key-arcane',
    name: 'Arcane Crate Key',
    priceNum: 99,
    priceDisplay: '₹99',
    category: 'keys',
    glowColor: '#a855f7',
    img: 'public/images/keys/arcane-key.png',
    assetKey: 'keys/arcane-key.png',
    reward: '2x Keys + 600 Shards',
    desc: 'Ancient spellbound crate unlocking mystic artifacts, rare weapons, and boost scrolls.',
    perks: ['2x Arcane Crate Keys', 'Guaranteed +600 Bonus Shards', 'Unlocks Mystic Weapons & Scrolls', 'Instant Delivery to Inventory']
  },
  {
    id: 'key-monthly',
    name: 'Monthly Crate Key',
    priceNum: 199,
    priceDisplay: '₹199',
    category: 'keys',
    glowColor: '#ffb300',
    img: 'public/images/keys/monthly-key.png',
    assetKey: 'keys/monthly-key.png',
    highlight: true,
    reward: '3x Keys + 1,500 Shards',
    desc: 'Exclusive monthly crate unlocking legendary limited-edition tools, armor, and massive shards.',
    perks: ['3x Monthly Crate Keys', 'Guaranteed +1,500 Bonus Shards', 'Unlocks Limited Edition Armor & Tools', 'Instant Delivery to Inventory']
  }
];

const SHARDS = [
  {
    id: 'shards-1k',
    name: '1,000 Shards Pack',
    priceNum: 49,
    priceDisplay: '₹49',
    category: 'shards',
    glowColor: '#38bdf8',
    img: 'public/images/shards/1k-shards.png',
    assetKey: 'shards/1k-shards.png',
    reward: '+50 Bonus Shards',
    desc: 'Starter gemstone bundle for auction purchases, trade market deals, and claim expansion.',
    perks: ['1,000 Lychee Shards', '+50 Free Bonus Shards', 'Trade Market Currency', 'Direct In-Game Credit']
  },
  {
    id: 'shards-3k',
    name: '3,000 Shards Pack',
    priceNum: 129,
    priceDisplay: '₹129',
    category: 'shards',
    glowColor: '#818cf8',
    img: 'public/images/shards/3k-shards.png',
    assetKey: 'shards/3k-shards.png',
    reward: '+200 Bonus Shards',
    desc: 'Popular gemstone bundle for buying rare player market goods and unlocking upgrades.',
    perks: ['3,000 Lychee Shards', '+200 Free Bonus Shards', 'Auction House Ready', 'Direct In-Game Credit']
  },
  {
    id: 'shards-5k',
    name: '5,000 Shards Pack',
    priceNum: 199,
    priceDisplay: '₹199',
    category: 'shards',
    glowColor: '#c084fc',
    img: 'public/images/shards/5k-shards.png',
    assetKey: 'shards/5k-shards.png',
    reward: '+500 Bonus Shards',
    desc: 'Generous treasure pack for serious builders and faction leaders wanting quick progression.',
    perks: ['5,000 Lychee Shards', '+500 Free Bonus Shards', 'Economy Booster', 'Direct In-Game Credit']
  },
  {
    id: 'shards-10k',
    name: '10,000 Shards Chest',
    priceNum: 349,
    priceDisplay: '₹349',
    category: 'shards',
    glowColor: '#f43f5e',
    img: 'public/images/shards/10k-shards.png',
    assetKey: 'shards/10k-shards.png',
    highlight: true,
    reward: '+1,500 Bonus Shards',
    desc: 'The ultimate royal vault of gemstones with maximum value and complimentary bonus shards.',
    perks: ['10,000 Lychee Shards', '+1,500 Free Bonus Shards', 'Maximum Value Vault', 'Direct In-Game Credit']
  }
];

const ALL_PRODUCTS = [...RANKS, ...KEYS, ...SHARDS];

// --- 2. DEDICATED POPUP CONFIGURATIONS ---
const POPUP_CONFIGS = {
  ranks: {
    title: '👑 Permanent Server Ranks',
    subtitle: 'Select your preferred rank tier with lifetime perks, kits, and chat glows',
    glow: 'rgba(244, 63, 94, 0.45)',
    items: RANKS
  },
  keys: {
    title: '🗝️ Pixel-Art Crate Keys',
    subtitle: 'Unlock Matrix, Arcane, and exclusive Monthly crates for rare loot',
    glow: 'rgba(168, 85, 247, 0.45)',
    items: KEYS
  },
  shards: {
    title: '💎 Official Lychee Shards',
    subtitle: 'Premium server gemstones for auction bids, claim extensions, and player trades',
    glow: 'rgba(0, 229, 255, 0.45)',
    items: SHARDS
  }
};

let currentOpenCategory = null;

// --- 3. POPUP WINDOW CONTROLLER ---
function openCategoryPopup(categoryKey) {
  const config = POPUP_CONFIGS[categoryKey];
  if (!config) return;

  currentOpenCategory = categoryKey;
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
  currentOpenCategory = null;
}

function closePopupOnOverlay(e) {
  if (e.target && e.target.id === 'categoryPopupOverlay') {
    closeCategoryPopup();
  }
}

// --- 4. PRODUCT CARD RENDERER ---
function createCardHTML(p) {
  const isHighlight = p.highlight ? 'highlight-card' : '';
  const tagHTML = p.highlight 
    ? `<span class="product-tag tag-best-value">🔥 Best Value</span>`
    : (p.reward ? `<span class="product-tag tag-reward">${p.reward}</span>` : '');

  const perksHTML = p.perks 
    ? `<ul class="product-perks-list">${p.perks.map(perk => `<li>${perk}</li>`).join('')}</ul>`
    : '';

  const imgSrc = getProductImg(p);
  const formattedPrice = formatPrice(p.priceNum);

  return `
    <article class="product-card ${isHighlight}" style="--card-glow-color: ${p.glowColor}40;" data-id="${p.id}">
      <div class="product-img-box">
        ${tagHTML}
        <img src="${imgSrc}" alt="${p.name}" class="product-img" onerror="window.resolveLMImage ? window.resolveLMImage(this, '${p.assetKey || p.id}') : null">
      </div>
      <div class="product-info">
        <span class="product-category-label">${p.category}</span>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        ${perksHTML}
        <div class="product-footer">
          <div class="price-box">
            <span class="price-label">Price</span>
            <span class="price-val">${formattedPrice}</span>
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
let cart = [];
try {
  const saved = localStorage.getItem('lycheemc_cart');
  if (saved) cart = JSON.parse(saved);
} catch (e) {
  cart = [];
}

function addToCart(productId, btnEl) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.priceNum,
      img: getProductImg(product),
      qty: 1
    });
  }

  saveCart();
  updateCartUI();

  if (btnEl) {
    const originalHTML = btnEl.innerHTML;
    btnEl.innerHTML = `<span>Added!</span> ✓`;
    btnEl.style.background = '#10b981';
    btnEl.style.borderColor = '#10b981';
    btnEl.style.color = '#fff';
    setTimeout(() => {
      btnEl.innerHTML = originalHTML;
      btnEl.style.background = '';
      btnEl.style.borderColor = '';
      btnEl.style.color = '';
    }, 1200);
  }

  showToast(`Added ${product.name} to cart!`);
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart() {
  try {
    localStorage.setItem('lycheemc_cart', JSON.stringify(cart));
  } catch (e) {}
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
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="window.resolveLMImage ? window.resolveLMImage(this, '${item.id}') : null">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)} each</div>
            <div class="cart-item-actions">
              <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span class="cart-item-qty">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-family: var(--font-mono); font-weight: 800; color: #fff;">${formatPrice(itemTotal)}</div>
            <button class="btn-remove-item" onclick="removeCartItem('${item.id}')" title="Remove">&times;</button>
          </div>
        </div>
      `;
    }).join('');
  }

  if (totalEl) totalEl.textContent = formatPrice(totalPrice);
}

function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeCartOnOverlay(e) {
  if (e.target && e.target.id === 'cartOverlay') {
    toggleCart();
  }
}

// --- 6. CHECKOUT & PAYMENT MODAL ---
let selectedEdition = 'java';
let selectedPaymentMethod = 'upi';

function openPaymentWindow() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Please add an item first.');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  // Update price displays with multi-currency conversion
  const payModalTotal = document.getElementById('payModalTotalAmount');
  if (payModalTotal) {
    payModalTotal.textContent = currentCurrency === 'INR' ? `₹${total}` : `${formatPrice(total)} (~ ₹${total} INR)`;
  }
  
  const upiDisplay = document.getElementById('upiDisplayAmount');
  if (upiDisplay) upiDisplay.textContent = '₹' + total;
  
  const btnSubmit = document.getElementById('btnSubmitPayment');
  if (btnSubmit) {
    btnSubmit.innerHTML = `<span>Pay &amp; Connect to In-Game (${formatPrice(total)})</span> ➔`;
  }

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
  if (e.target && e.target.id === 'paymentModalOverlay') {
    closePaymentWindow();
  }
}

function selectEdition(ed) {
  selectedEdition = ed;
  document.querySelectorAll('.edition-tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.edition-tab[data-edition="${ed}"]`);
  if (activeTab) activeTab.classList.add('active');

  const ignInput = document.getElementById('payIgnInput');
  if (ignInput) {
    if (ed === 'bedrock') {
      ignInput.placeholder = 'e.g. .Username or Gamertag';
    } else {
      ignInput.placeholder = 'e.g. Syuka1x';
    }
  }

  updateInGameSyncDisplay();
}

function updatePaymentAvatar(ign) {
  const cleanIGN = (ign || '').trim();
  const avatarImg = document.getElementById('payAvatarPreview');
  if (!cleanIGN) {
    if (avatarImg) avatarImg.src = 'https://mc-heads.net/avatar/Steve/24';
    return;
  }
  const formattedIGN = cleanIGN.startsWith('.') ? cleanIGN.slice(1) : cleanIGN;
  if (avatarImg) avatarImg.src = `https://mc-heads.net/avatar/${formattedIGN}/24`;
  updateInGameSyncDisplay();
}

function updateInGameSyncDisplay() {
  const ign = (document.getElementById('payIgnInput')?.value || playerIGN || 'Player').trim();
  const edText = selectedEdition === 'bedrock' ? 'Bedrock Edition' : 'Java Edition';
  const syncEl = document.getElementById('payInGameSyncDesc');
  if (syncEl) {
    syncEl.innerHTML = `Items will be auto-delivered to <strong>${ign}</strong> (${edText}) on <strong>play.lycheemc.fun</strong> upon verification.`;
  }
}

function switchPayMethod(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.method-pill').forEach(p => p.classList.remove('active'));
  const activePill = document.querySelector(`.method-pill[data-method="${method}"]`);
  if (activePill) activePill.classList.add('active');

  const upiPane = document.getElementById('upiPayPane');
  const cardPane = document.getElementById('cardPayPane');

  if (method === 'upi') {
    if (upiPane) upiPane.style.display = 'block';
    if (cardPane) cardPane.style.display = 'none';
  } else {
    if (upiPane) upiPane.style.display = 'none';
    if (cardPane) cardPane.style.display = 'block';
  }
}

function appendUpiHandle(handle) {
  const inp = document.getElementById('payUpiVpa');
  if (!inp) return;
  const current = inp.value.split('@')[0];
  inp.value = (current || 'username') + handle;
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
  input.value = val;
}

// --- 7. PROCESS PAYMENT SUBMISSION ---
function processPayment() {
  const ign = (document.getElementById('payIgnInput')?.value || '').trim();
  if (!ign) {
    showToast('Please enter your in-game Minecraft Username!');
    document.getElementById('payIgnInput')?.focus();
    return;
  }

  // Validate UTR or Card
  if (selectedPaymentMethod === 'upi') {
    const utr = (document.getElementById('payUpiUtr')?.value || '').trim();
    if (utr.length < 12) {
      showToast('Please enter a valid 12-digit UPI UTR number from your payment app receipt!');
      document.getElementById('payUpiUtr')?.focus();
      return;
    }
  }

  // Save IGN globally
  playerIGN = ign;
  localStorage.setItem('lycheemc_ign', ign);
  updatePlayerUI();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemsSummary = cart.map(i => `${i.name} (x${i.qty})`).join(', ');

  // Show processing state on button
  const btn = document.getElementById('btnSubmitPayment');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<span>Verifying Order with Server...</span> ⏳`;
  btn.disabled = true;

  // Optional: Send Discord Webhook notification
  if (DISCORD_WEBHOOK_URL) {
    try {
      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '💎 New Store Order Submitted!',
            color: 0xf43f5e,
            fields: [
              { name: '👤 Player IGN', value: `\`${ign}\` (${selectedEdition.toUpperCase()})`, inline: true },
              { name: '💰 Total Amount', value: `₹${total} (${formatPrice(total)})`, inline: true },
              { name: '💳 Method', value: selectedPaymentMethod.toUpperCase(), inline: true },
              { name: '📦 Items', value: itemsSummary },
              { name: '🔖 UTR / Ref', value: document.getElementById('payUpiUtr')?.value || 'Card / Online' }
            ],
            footer: { text: 'LycheeMC Automated Store • play.lycheemc.fun' },
            timestamp: new Date().toISOString()
          }]
        })
      }).catch(() => {});
    } catch (e) {}
  }

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled = false;

    // Close payment window
    closePaymentWindow();

    // Open Success Modal
    openSuccessModal(ign, total, itemsSummary);

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
  }, 1200);
}

function openSuccessModal(ign, total, itemsSummary) {
  const modal = document.getElementById('successModal');
  const playerSpan = document.getElementById('successPlayerIGN');
  const avatarImg = document.getElementById('successPlayerAvatar');
  const itemsSpan = document.getElementById('successItemsSummary');

  if (playerSpan) playerSpan.textContent = ign;
  if (itemsSpan) itemsSpan.textContent = itemsSummary;
  if (avatarImg) {
    const formattedIGN = ign.startsWith('.') ? ign.slice(1) : ign;
    avatarImg.src = `https://mc-heads.net/avatar/${formattedIGN}/48`;
  }

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// --- 8. RETURN & REFUND POLICY MODAL CONTROLLER ---
function openPolicyModal(type) {
  const modal = document.getElementById('refundPolicyModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closePolicyModal() {
  const modal = document.getElementById('refundPolicyModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closePolicyOnOverlay(e) {
  if (e.target && e.target.id === 'refundPolicyModal') {
    closePolicyModal();
  }
}

// --- 9. PLAYER IGN & UI PROFILE LOGIC ---
let playerIGN = localStorage.getItem('lycheemc_ign') || '';

function promptIGN() {
  const current = playerIGN || '';
  const newIGN = prompt('Enter your in-game Minecraft Username (IGN):', current);
  if (newIGN !== null) {
    const trimmed = newIGN.trim();
    if (trimmed) {
      playerIGN = trimmed;
      localStorage.setItem('lycheemc_ign', playerIGN);
      updatePlayerUI();
      showToast(`Logged in as ${playerIGN}!`);
    }
  }
}

function updatePlayerUI() {
  const ignEl = document.getElementById('navIGN');
  const avatarEl = document.getElementById('navAvatar');
  if (!playerIGN) {
    if (ignEl) ignEl.textContent = 'Guest';
    if (avatarEl) avatarEl.src = 'https://mc-heads.net/avatar/Steve/26';
    return;
  }

  if (ignEl) ignEl.textContent = playerIGN;
  const clean = playerIGN.startsWith('.') ? playerIGN.slice(1) : playerIGN;
  if (avatarEl) avatarEl.src = `https://mc-heads.net/avatar/${clean}/26`;
}

// --- 10. COPY SERVER IP CLIPBOARD ---
function copyServerIP() {
  const ip = 'play.lycheemc.fun';
  navigator.clipboard.writeText(ip).then(() => {
    const badge = document.getElementById('ipCopyBadge');
    if (badge) {
      badge.textContent = 'Copied!';
      badge.classList.add('copied');
      setTimeout(() => {
        badge.textContent = 'Copy';
        badge.classList.remove('copied');
      }, 2000);
    }
    showToast('Copied server IP: play.lycheemc.fun to clipboard!');
  }).catch(() => {
    showToast('Server IP: play.lycheemc.fun (Port: 25567)');
  });
}

// --- 11. TOAST NOTIFICATION UTILITY ---
function showToast(msg) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #111420;
      color: #fff;
      padding: 12px 20px;
      border-radius: 12px;
      border: 1px solid rgba(244, 63, 94, 0.4);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      font-family: var(--font-display, sans-serif);
      font-size: 13.5px;
      font-weight: 600;
      z-index: 100000;
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>⚡</span> ${msg}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 2600);
}

// --- 12. INITIALIZATION ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  updatePlayerUI();
  updateCartUI();
  updateCurrencyUI();
  refreshPricesOnPage();

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('currencyDropdownWrap');
    if (wrap && !wrap.contains(e.target)) {
      wrap.classList.remove('open');
    }
  });

  // Ensure portal preview images are properly loaded from base64 if available
  if (window.LM_IMGS) {
    const rImg = document.getElementById('portalRanksImg');
    const kImg = document.getElementById('portalKeysImg');
    const sImg = document.getElementById('portalShardsImg');
    if (rImg && window.LM_IMGS['ranks/lychee-plus.png']) rImg.src = window.LM_IMGS['ranks/lychee-plus.png'];
    if (kImg && window.LM_IMGS['keys/matrix-key.png']) kImg.src = window.LM_IMGS['keys/matrix-key.png'];
    if (sImg && window.LM_IMGS['shards/10k-shards.png']) sImg.src = window.LM_IMGS['shards/10k-shards.png'];
  }
});
