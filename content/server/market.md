---
title: Биржевой радар & Рынок
---

<div class="hud-terminal">
  <div class="hud-item">
    <span class="hud-status-indicator" id="market-status-dot"></span>
    <span class="hud-label">TELEMETRY_FEED:</span>
    <span class="hud-value" id="market-status-text">CONNECTING...</span>
  </div>
  <span class="hud-divider">/</span>
  <div class="hud-item">
    <span class="hud-label">OUTLETS_DETECTED:</span>
    <span class="hud-accent" id="market-outlets-count">0</span>
  </div>
  <span class="hud-divider">/</span>
  <div class="hud-item">
    <span class="hud-label">ACTIVE_LOTS:</span>
    <span class="hud-value" id="market-lots-count">0</span>
  </div>
  <span class="hud-divider">/</span>
  <div class="hud-item">
    <span class="hud-label">SYNC_TIME:</span>
    <span class="hud-value" id="market-sync-time">--:--:--</span>
  </div>
</div>

# 📡 БИРЖЕВОЙ РАДАР // СВОДКА РЫНКА

Прямая телеметрия торговых автоматов и магазинов игроков на базе мода [[server/economy|Lightman's Currency]]. Данные считываются непосредственно из памяти кластера и обновляются автоматически.

---

## 🔍 ПОИСК ПО ТЕРМИНАЛУ

<div style="margin: 1.5rem 0;">
  <input 
    type="text" 
    id="market-search-input" 
    placeholder="ВВЕДИТЕ НАЗВАНИЕ ПРЕДМЕТА, НИК ПРОДАВЦА ИЛИ КООРДИНАТЫ..." 
    style="width: 100%; max-width: 650px; background: #15181E; border: 1px solid #232832; color: #F0F2F5; padding: 0.75rem 1rem; border-radius: 2px; font-family: var(--codeFont), monospace; font-size: 0.85rem; outline: none; transition: border-color 0.15s ease;"
    onfocus="this.style.borderColor='#E0633C'"
    onblur="this.style.borderColor='#232832'"
  />
</div>

---

## 01 // АКТИВНЫЕ ЛОТЫ В ПРОДАЖЕ

<div style="overflow-x: auto;">
  <table id="market-items-table">
    <thead>
      <tr>
        <th>НАИМЕНОВАНИЕ ЛОТА</th>
        <th>ПРОДАВЕЦ / ТОЧКА</th>
        <th>КООРДИНАТЫ [XYZ]</th>
        <th>НАЛИЧИЕ</th>
        <th>ЦЕНА</th>
      </tr>
    </thead>
    <tbody id="market-items-body">
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-desc); padding: 2rem;">
          Ожидание поступления телеметрии...
        </td>
      </tr>
    </tbody>
  </table>
</div>

---

## 02 // ЗАРЕГИСТРИРОВАННЫЕ ТОРГОВЫЕ ТОЧКИ НА КАРТЕ

<div style="overflow-x: auto;">
  <table id="market-outlets-table">
    <thead>
      <tr>
        <th>ТОЧКА / МАГАЗИН</th>
        <th>ВЛАДЕЛЕЦ</th>
        <th>ТИП ТЕРМИНАЛА</th>
        <th>ЛОКАЦИЯ (КООРДИНАТЫ)</th>
        <th>СТАТУС</th>
      </tr>
    </thead>
    <tbody id="market-outlets-body">
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-desc); padding: 2rem;">
          Сканирование секторов мира...
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div class="spec-footer">
  <div><span>MODULE: LIGHTMAN_RADAR_V1 // PROTOCOL: NBT_TELEMETRY</span></div>
  <div>
    <a href="https://github.com/Concept-Kult/wiki/edit/v5/content/server/market.md">EDIT_SPEC [GITHUB] ↗</a> · 
    <a href="./economy">СПРАВКА ПО ЭКОНОМИКЕ →</a>
  </div>
</div>

<script>
(function() {
  var searchInput = document.getElementById('market-search-input');
  var itemsBody = document.getElementById('market-items-body');
  var outletsBody = document.getElementById('market-outlets-body');
  var statusText = document.getElementById('market-status-text');
  var statusDot = document.getElementById('market-status-dot');
  var outletsCount = document.getElementById('market-outlets-count');
  var lotsCount = document.getElementById('market-lots-count');
  var syncTime = document.getElementById('market-sync-time');

  var cachedData = null;

  function loadMarketData() {
    fetch('/market.json?t=' + Date.now())
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        cachedData = data;
        renderData();
        if (statusText) statusText.innerText = 'ONLINE // SYNCED';
        if (statusDot) statusDot.style.background = '#10b981';
      })
      .catch(function(err) {
        if (statusText) statusText.innerText = 'OFFLINE / NO_DATA';
        if (statusDot) statusDot.style.background = '#ef4444';
      });
  }

  function renderData() {
    if (!cachedData) return;

    var query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    if (outletsCount) outletsCount.innerText = cachedData.total_outlets || 0;
    if (lotsCount) lotsCount.innerText = cachedData.total_items || 0;
    if (syncTime) syncTime.innerText = cachedData.last_update ? cachedData.last_update.split(' ')[1] : '--:--:--';

    // 1. Рендер активных лотов
    if (itemsBody) {
      var items = cachedData.items || [];
      var filteredItems = items.filter(function(item) {
        if (!query) return true;
        var text = (item.item_name + ' ' + item.item_id + ' ' + item.seller + ' ' + item.coords).toLowerCase();
        return text.indexOf(query) !== -1;
      });

      if (filteredItems.length === 0) {
        itemsBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-desc); padding: 1.75rem;">' +
          (items.length === 0 ? 'На сервере пока нет выставленных лотов. Игроки ещё заполняют витрины!' : 'По запросу "' + query + '" лотов не найдено.') +
          '</td></tr>';
      } else {
        var html = '';
        filteredItems.forEach(function(item) {
          html += '<tr>' +
            '<td><b style="color: #F0F2F5;">' + item.item_name + '</b><br><span style="font-family: var(--codeFont); font-size: 0.72rem; color: #5c6475;">' + item.item_id + '</span></td>' +
            '<td><span class="coord-tag">' + item.seller + '</span><br><span style="font-size: 0.76rem; color: #8C95A5;">' + item.shop_name + '</span></td>' +
            '<td><code style="font-size: 0.78rem;">' + item.coords + '</code></td>' +
            '<td><span style="font-weight: 600; color: #F0F2F5;">' + item.stock + '</span></td>' +
            '<td><span style="color: #E0633C; font-weight: 700; font-family: var(--codeFont);">' + item.price_str + '</span></td>' +
          '</tr>';
        });
        itemsBody.innerHTML = html;
      }
    }

    // 2. Рендер торговых точек
    if (outletsBody) {
      var outlets = cachedData.outlets || [];
      var filteredOutlets = outlets.filter(function(o) {
        if (!query) return true;
        var text = (o.name + ' ' + o.owner + ' ' + o.type + ' ' + o.coords).toLowerCase();
        return text.indexOf(query) !== -1;
      });

      if (filteredOutlets.length === 0) {
        outletsBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-desc); padding: 1.75rem;">Точек не обнаружено.</td></tr>';
      } else {
        var oHtml = '';
        filteredOutlets.forEach(function(o) {
          var isReady = o.status === 'АКТИВЕН';
          var badgeColor = isReady ? '#10b981' : '#E5A93C';
          var badgeBg = isReady ? 'rgba(16, 185, 129, 0.15)' : 'rgba(229, 169, 60, 0.15)';

          oHtml += '<tr>' +
            '<td><b style="color: #F0F2F5;">' + o.name + '</b></td>' +
            '<td><span class="coord-tag">' + o.owner + '</span></td>' +
            '<td><span style="font-size: 0.8rem; color: #A0ABC0;">' + o.type + '</span></td>' +
            '<td><code style="font-size: 0.78rem;">' + o.coords + '</code></td>' +
            '<td><span style="display: inline-block; font-family: var(--codeFont); font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 2px; color: ' + badgeColor + '; background: ' + badgeBg + '; border: 1px solid ' + badgeColor + '44;">' + o.status + ' (' + o.trades_count + ' СЛОТОВ)</span></td>' +
          '</tr>';
        });
        outletsBody.innerHTML = oHtml;
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderData);
  }

  loadMarketData();
  setInterval(loadMarketData, 30000);
})();
</script>
