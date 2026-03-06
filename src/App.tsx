import { useMemo, useState } from 'react';

type TopMenuKey = 'modern' | 'nature' | 'night';
type SideMenuItem = {
  id: string;
  title: string;
  description: string;
  visual: {
    badge: string;
    heading: string;
    text: string;
    palette: string;
    image: string;
  };
};

const topMenus: { key: TopMenuKey; label: string }[] = [
  { key: 'modern', label: 'Modern' },
  { key: 'nature', label: 'Doğa' },
  { key: 'night', label: 'Gece' },
];

const sideMenusByTheme: Record<TopMenuKey, SideMenuItem[]> = {
  modern: [
    {
      id: 'hero',
      title: 'Hero Alanı',
      description: 'Ana mesajın bulunduğu üst bölüm. Tıklayınca kart görseli değişir.',
      visual: {
        badge: 'MODERN / HERO',
        heading: 'Temiz ve güçlü bir açılış alanı',
        text: 'Marka vurgusunu ilk bakışta öne çıkaran yalın düzen.',
        palette: 'palette-modern-1',
        image:
          'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'cards',
      title: 'Servis Kartları',
      description: 'Ürün veya hizmet maddelerini kart yapısında sunan bölüm.',
      visual: {
        badge: 'MODERN / KARTLAR',
        heading: 'Grid düzen ile net hizmet sunumu',
        text: 'Ziyaretçinin hızlı karar vermesi için sade kart yapıları.',
        palette: 'palette-modern-2',
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'cta',
      title: 'Çağrı Alanı',
      description: 'Kullanıcıyı kayıt veya iletişim aksiyonuna yönlendiren bölüm.',
      visual: {
        badge: 'MODERN / CTA',
        heading: 'Dönüşüm odaklı eylem mesajı',
        text: 'Vurucu buton ve kısa metin ile ziyaretçiyi aksiyona taşıyın.',
        palette: 'palette-modern-3',
        image:
          'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
      },
    },
  ],
  nature: [
    {
      id: 'mountain',
      title: 'Dağ Manzarası',
      description: 'Sakin ve güven veren giriş hissi için doğal tonlar.',
      visual: {
        badge: 'DOĞA / DAĞ',
        heading: 'Ferah, organik ve yumuşak geçişler',
        text: 'Markaya doğallık ve sadelik hissi kazandıran görsel yaklaşım.',
        palette: 'palette-nature-1',
        image:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'forest',
      title: 'Orman Doku',
      description: 'Arka planlarda detaylı ama gözü yormayan doğal dokular.',
      visual: {
        badge: 'DOĞA / ORMAN',
        heading: 'Derinlik veren yeşil katmanlar',
        text: 'Bilgi bölümlerinde sakin bir okuma deneyimi oluşturur.',
        palette: 'palette-nature-2',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'lake',
      title: 'Göl Kompozisyonu',
      description: 'Kurumsal sunumlarda dengeli ve premium bir atmosfer sağlar.',
      visual: {
        badge: 'DOĞA / GÖL',
        heading: 'Dinginlik odaklı geniş görsel alan',
        text: 'Kısa başlık + net CTA ile modern bir doğa teması.',
        palette: 'palette-nature-3',
        image:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      },
    },
  ],
  night: [
    {
      id: 'city',
      title: 'Şehir Işıkları',
      description: 'Teknoloji veya yazılım ürünleri için güçlü gece stili.',
      visual: {
        badge: 'GECE / ŞEHİR',
        heading: 'Kontrastı yüksek premium görünüm',
        text: 'Parlak vurgu renkleri ile dikkat çeken kart kompozisyonu.',
        palette: 'palette-night-1',
        image:
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'neon',
      title: 'Neon Vurgu',
      description: 'Lansman sayfalarında enerjik bir hava katmak için ideal.',
      visual: {
        badge: 'GECE / NEON',
        heading: 'Dinamik ve genç bir kimlik',
        text: 'Neon çizgilerle modern aksanlar oluşturan vitrin düzeni.',
        palette: 'palette-night-2',
        image:
          'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'minimal',
      title: 'Koyu Minimal',
      description: 'Kurumsal sitelerde yalın ama güçlü görünüm isteyenler için.',
      visual: {
        badge: 'GECE / MİNİMAL',
        heading: 'Tipografi odaklı sessiz güç',
        text: 'Az öğe ile yüksek etki sunan modern gece yaklaşımı.',
        palette: 'palette-night-3',
        image:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      },
    },
  ],
};

export default function App() {
  const [activeTopMenu, setActiveTopMenu] = useState<TopMenuKey>('modern');
  const [activeSideMenuId, setActiveSideMenuId] = useState<string>(sideMenusByTheme.modern[0].id);
  const [openDescriptionId, setOpenDescriptionId] = useState<string | null>(sideMenusByTheme.modern[0].id);

  const activeSideMenus = sideMenusByTheme[activeTopMenu];

  const activeVisual = useMemo(() => {
    return (
      activeSideMenus.find((item) => item.id === activeSideMenuId)?.visual ?? activeSideMenus[0].visual
    );
  }, [activeSideMenuId, activeSideMenus]);

  const handleTopMenuClick = (menuKey: TopMenuKey) => {
    const firstItem = sideMenusByTheme[menuKey][0];
    setActiveTopMenu(menuKey);
    setActiveSideMenuId(firstItem.id);
    setOpenDescriptionId(firstItem.id);
  };

  const handleSideMenuClick = (itemId: string) => {
    setActiveSideMenuId(itemId);
    setOpenDescriptionId((prev) => (prev === itemId ? null : itemId));
  };

  const setFromVisualPanel = (itemId: string) => {
    setActiveSideMenuId(itemId);
    setOpenDescriptionId(itemId);
  };

  return (
    <main className="page">
      <section className="demo-layout">
        <header className="top-menu">
          {topMenus.map((menu) => (
            <button
              key={menu.key}
              type="button"
              onClick={() => handleTopMenuClick(menu.key)}
              className={menu.key === activeTopMenu ? 'menu-btn is-active' : 'menu-btn'}
            >
              {menu.label}
            </button>
          ))}
        </header>

        <div className="content">
          <aside className="side-menu">
            {activeSideMenus.map((item) => {
              const isActive = item.id === activeSideMenuId;
              const isOpen = item.id === openDescriptionId;

              return (
                <div key={item.id} className={isActive ? 'side-item is-active' : 'side-item'}>
                  <button type="button" className="side-btn" onClick={() => handleSideMenuClick(item.id)}>
                    <span>{item.title}</span>
                    <span className={isOpen ? 'chevron is-open' : 'chevron'}>⌄</span>
                  </button>
                  {isOpen && <p className="dropdown-text">{item.description}</p>}
                </div>
              );
            })}
          </aside>

          <article className={`visual-card ${activeVisual.palette}`}>
            <img src={activeVisual.image} alt={activeVisual.heading} className="visual-image" />
            <div className="visual-overlay" />
            <div className="visual-content">
              <small>{activeVisual.badge}</small>
              <h1>{activeVisual.heading}</h1>
              <p>{activeVisual.text}</p>

              <div className="visual-actions">
                {activeSideMenus.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFromVisualPanel(item.id)}
                    className={item.id === activeSideMenuId ? 'chip-btn is-active' : 'chip-btn'}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
