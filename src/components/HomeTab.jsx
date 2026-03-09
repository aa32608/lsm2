"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function HomeTab() {
  const {
    t,
    user,
    setShowPostForm,
    setShowAuthModal,
    setAuthMode,
    setForm,
    categoryIcons,
    categoryGroups,
    setCatFilter,
    activeListingCount,
    verifiedListingCount,
    publicListings,
    aggregateStats = {},
  } = useApp();

  const [chartActiveId, setChartActiveId] = useState(null);
  const [chartTooltipPos, setChartTooltipPos] = useState({ x: 0, y: 0 });

  const router = useRouter();

  const handlePostClick = () => {
    if (!user) {
      setAuthMode("login");
      setShowAuthModal(true);
    } else {
      setShowPostForm(true);
      setForm((f) => ({ ...f, step: 1 }));
    }
  };

  const handleCategoryClick = (cat) => {
    setCatFilter(cat);
    router.push('/listings');
  };

  // Compact: 3 categories per group for homepage (short, scannable)
  const categoriesPerGroup = 3;

  return (
    <div className="app-main-content home-page">
      {/* HERO SECTION */}
      <section 
        className="hero-section hero-section--home" 
        aria-labelledby="hero-title"
      >
        <div className="container hero-container">
          <h1 id="hero-title" className="hero-title hero-title--home">
            {t("homeSimpleTitle")}
          </h1>
          <p className="hero-subtitle hero-subtitle--home">
            {t("homeSimpleSubtitle")}
          </p>
          
          <div className="hero-actions hero-actions--home" role="group" aria-label={t("mainActions")}>
            <Link
              href="/listings"
              className="btn btn-secondary hero-btn-secondary"
              aria-label={t("findLocalService")}
            >
              <span className="btn-icon" aria-hidden="true">🔍</span>
              <span className="btn-text">{t("findLocalService")}</span>
            </Link>
            <button
              className="btn btn-primary hero-btn-primary"
              onClick={handlePostClick}
              aria-label={t("heroPostCtaShort")}
            >
              <span className="btn-icon" aria-hidden="true">📝</span>
              <span className="btn-text">{t("heroPostCtaShort")}</span>
            </button>
            
          </div>
          
          <p className="hero-trust-line" role="note">
            <span className="trust-icon" aria-hidden="true">💡</span>
            {t("homeSimpleTrustLine")}
          </p>
        </div>
      </section>

      {/* CONTENT SECTION: Business Categories & Services */}
      <section className="content-section" aria-labelledby="content-title">
        <div className="container content-container">
          <h2 id="content-title" className="section-title content-title">
            {t("exploreBusinessCategories")}
          </h2>
          <p className="content-subtitle">
            {t("discoverLocalServicesInNorthMacedonia")}
          </p>
          
          <div className="category-grid">
            {Object.entries(categoryGroups).slice(0, 8).map(([groupName, cats]) => (
              <div key={groupName} className="category-group">
                <h3 className="category-group-title">{t(groupName)}</h3>
                <div className="category-items">
                  {cats.slice(0, categoriesPerGroup).map(cat => (
                    <button
                      key={cat}
                      className="category-item"
                      onClick={() => handleCategoryClick(cat)}
                      aria-label={`${t("browse")} ${t(cat)}`}
                    >
                      <span className="category-icon" aria-hidden="true">{categoryIcons[cat]}</span>
                      <span className="category-name">{t(cat)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL CONTENT: Business Tips & Guides */}
      <section className="educational-section" aria-labelledby="educational-title">
        <div className="container educational-container">
          <h2 id="educational-title" className="section-title educational-title">
            {t("businessTipsAndGuides")}
          </h2>
          <div className="educational-grid">
            <article className="educational-card">
              <div className="educational-icon">💼</div>
              <h3>{t("howToListYourBusiness")}</h3>
              <p>{t("learnBestPracticesForCreatingEffectiveListings")}</p>
              <Link href="/guide/listing" className="read-more-link">{t("readMore")}</Link>
            </article>
            <article className="educational-card">
              <div className="educational-icon">📈</div>
              <h3>{t("marketingStrategies")}</h3>
              <p>{t("discoverEffectiveMarketingTechniquesForLocalBusinesses")}</p>
              <Link href="/guide/marketing" className="read-more-link">{t("readMore")}</Link>
            </article>
            <article className="educational-card">
              <div className="educational-icon">🤝</div>
              <h3>{t("customerService")}</h3>
              <p>{t("tipsForProvidingExcellentCustomerServiceAndBuildingTrust")}</p>
              <Link href="/guide/service" className="read-more-link">{t("readMore")}</Link>
            </article>
            <article className="educational-card">
              <div className="educational-icon">📱</div>
              <h3>{t("digitalPresence")}</h3>
              <p>{t("howToStrengthenYourBusinessOnlinePresenceAndReachMoreCustomers")}</p>
              <Link href="/guide/digital" className="read-more-link">{t("readMore")}</Link>
            </article>
          </div>
        </div>
      </section>

      {/* LOCAL INSIGHTS: Market Trends & Statistics */}
      <section className="insights-section" aria-labelledby="insights-title">
        <div className="container insights-container">
          <h2 id="insights-title" className="section-title insights-title">
            {t("northMacedoniaBusinessInsights")}
          </h2>
          <p className="insights-subtitle">
            {t("understandLocalMarketTrendsAndOpportunities")}
          </p>
          
          <div className="insights-grid">
            <div className="insight-card">
              <h3>{t("growingSectors")}</h3>
              <p>{t("discoverWhichBusinessSectorsAreThrivingInNorthMacedonia")}</p>
              <ul className="insight-list">
                <li>🏗️ {t("constructionAndRenovation")}</li>
                <li>🍽️ {t("restaurantsAndHospitality")}</li>
                <li>💻 {t("technologyAndServices")}</li>
                <li>🛍️ {t("retailAndLocalShopping")}</li>
              </ul>
            </div>
            <div className="insight-card">
              <h3>{t("regionalHighlights")}</h3>
              <p>{t("businessOpportunitiesByRegion")}</p>
              <ul className="insight-list">
                <li>🏛️ {t("skopjeBusinessHub")}</li>
                <li>🏖️ {t("ohridTourismServices")}</li>
                <li>🏭 {t("bitolaManufacturing")}</li>
                <li>🌾 {t("agriculturalRegions")}</li>
              </ul>
            </div>
            <div className="insight-card">
              <h3>{t("successStories")}</h3>
              <p>{t("learnFromLocalBusinessSuccessStories")}</p>
              <ul className="insight-list">
                <li>📊 {t("growthCaseStudies")}</li>
                <li>🎯 {t("marketingSuccess")}</li>
                <li>💡 {t("innovationExamples")}</li>
                <li>🤝 {t("partnershipSuccess")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION: Common Questions & Answers */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="container faq-container">
          <h2 id="faq-title" className="section-title faq-title">
            {t("frequentlyAskedQuestions")}
          </h2>
          <p className="faq-subtitle">
            {t("getAnswersToCommonQuestionsAboutBizCallAndLocalBusinessInNorthMacedonia")}
          </p>
          
          <div className="faq-grid">
            <article className="faq-item">
              <h3>{t("whatIsBizCall")}</h3>
              <p>{t("bizCallIsAPremierPlatformForBusinessesInNorthMacedoniaToConnectWithCustomers")}</p>
            </article>
            <article className="faq-item">
              <h3>{t("howToCreateListing")}</h3>
              <p>{t("creatingAListingOnBizCallIsSimpleAndTakesJustAFewMinutes")}</p>
            </article>
            <article className="faq-item">
              <h3>{t("isBizCallFree")}</h3>
              <p>{t("bizCallOffersBothFreeAndPremiumListingOptions")}</p>
            </article>
            <article className="faq-item">
              <h3>{t("howDoCustomersContact")}</h3>
              <p>{t("customersCanContactBusinessesDirectlyThroughPhoneEmailOrWebsite")}</p>
            </article>
            <article className="faq-item">
              <h3>{t("whatTypesOfBusinesses")}</h3>
              <p>{t("bizCallWelcomesAllTypesOfBusinessesFromServicesToRetail")}</p>
            </article>
            <article className="faq-item">
              <h3>{t("howToIncreaseVisibility")}</h3>
              <p>{t("featuredListingsGetPremiumPlacementAndIncreasedExposure")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* BLOG-STYLE CONTENT: Business Articles */}
      <section className="blog-section" aria-labelledby="blog-title">
        <div className="container blog-container">
          <h2 id="blog-title" className="section-title blog-title">
            {t("businessInsightsBlog")}
          </h2>
          <p className="blog-subtitle">
            {t("expertAdviceAndTipsForNorthMacedoniaBusinessOwners")}
          </p>
          
          <div className="blog-grid">
            <article className="blog-card">
              <div className="blog-meta">
                <span className="blog-category">{t("marketing")}</span>
                <span className="blog-date">{t("recentPost")}</span>
              </div>
              <h3>{t("topMarketingStrategiesForSmallBusinessesInSkopje")}</h3>
              <p>{t("discoverEffectiveMarketingTechniquesSpecificallyTailoredForSkopjesCompetitiveBusinessLandscape")}</p>
              <div className="blog-excerpt">
                <p>{t("inTodaysDigitalAgeSmallBusinessesInSkopjeNeedToLeverageMultipleMarketingChannelsToReachTheirTargetAudience")}</p>
              </div>
              <Link href="/blog/marketing-skopje" className="blog-read-more">{t("readFullArticle")}</Link>
            </article>
            
            <article className="blog-card">
              <div className="blog-meta">
                <span className="blog-category">{t("customerService")}</span>
                <span className="blog-date">{t("popularPost")}</span>
              </div>
              <h3>{t("buildingCustomerTrustInNorthMacedoniaServiceIndustry")}</h3>
              <p>{t("learnHowToEstablishAndMaintainTrustWithCustomersInTheCompetitiveServiceSector")}</p>
              <div className="blog-excerpt">
                <p>{t("trustIsTheFoundationOfAnySuccessfulBusinessRelationshipEspeciallyInTheServiceIndustryWhereCustomers")}</p>
              </div>
              <Link href="/blog/customer-trust" className="blog-read-more">{t("readFullArticle")}</Link>
            </article>
            
            <article className="blog-card">
              <div className="blog-meta">
                <span className="blog-category">{t("businessGrowth")}</span>
                <span className="blog-date">{t("trendingPost")}</span>
              </div>
              <h3>{t("seasonalBusinessOpportunitiesInOhridTourismRegion")}</h3>
              <p>{t("exploreSeasonalBusinessTrendsAndOpportunitiesInOhridsThrivingTourismIndustry")}</p>
              <div className="blog-excerpt">
                <p>{t("ohridsTourismIndustryOffersUniqueSeasonalOpportunitiesForLocalBusinessesFromSummerPeakSeasonToWinter")}</p>
              </div>
              <Link href="/blog/ohrid-seasonal" className="blog-read-more">{t("readFullArticle")}</Link>
            </article>
            
            <article className="blog-card">
              <div className="blog-meta">
                <span className="blog-category">{t("technology")}</span>
                <span className="blog-date">{t("featuredPost")}</span>
              </div>
              <h3>{t("digitalTransformationForTraditionalBusinesses")}</h3>
              <p>{t("howTraditionalNorthMacedoniaBusinessesCanEmbraceDigitalToolsAndOnlinePlatforms")}</p>
              <div className="blog-excerpt">
                <p>{t("digitalTransformationIsNoLongerOptionalForBusinessesWantingToStayCompetitiveInTodaysMarket")}</p>
              </div>
              <Link href="/blog/digital-transformation" className="blog-read-more">{t("readFullArticle")}</Link>
            </article>
          </div>
        </div>
      </section>

      {/* BUSINESS SUCCESS STORIES */}
      <section className="success-stories-section" aria-labelledby="success-title">
        <div className="container success-container">
          <h2 id="success-title" className="section-title success-title">
            {t("successStories")}
          </h2>
          <p className="success-subtitle">
            {t("realStoriesFromNorthMacedoniaBusinessesWhoHaveThrivedWithBizCall")}
          </p>
          
          <div className="success-grid">
            <article className="success-card">
              <div className="success-icon">🏪</div>
              <h3>{t("familyRestaurantInBitola")}</h3>
              <p>{t("howATraditionalFamilyRestaurantIncreasedCustomerBaseBy40UsingBizCall")}</p>
              <blockquote className="success-quote">
                "{t("bizCallHelpedUsReachCustomersWeNeverWouldHaveFoundOtherwise")}"
                <cite>— {t("restaurantOwnerBitola")}</cite>
              </blockquote>
            </article>
            
            <article className="success-card">
              <div className="success-icon">🔧</div>
              <h3>{t("plumbingServiceInTetovo")}</h3>
              <p>{t("independentPlumberGrewBusinessBy60WithStrategicListing")}</p>
              <blockquote className="success-quote">
                "{t("theReturnOnInvestmentFromBizCallFeaturedListingsHasBeenExceptional")}"
                <cite>— {t("plumbingServiceOwner")}</cite>
              </blockquote>
            </article>
            
            <article className="success-card">
              <div className="success-icon">💇</div>
              <h3>{t("hairSalonInGostivar")}</h3>
              <p>{t("localBeautySalonAttractedNewClientsThroughPremiumListing")}</p>
              <blockquote className="success-quote">
                "{t("ourAppointmentBookingsIncreasedSignificantlyAfterJoiningBizCall")}"
                <cite>— {t("salonOwnerGostivar")}</cite>
              </blockquote>
            </article>
          </div>
        </div>
      </section>
      <section className="resources-section" aria-labelledby="resources-title">
        <div className="container resources-container">
          <h2 id="resources-title" className="section-title resources-title">
            {t("businessResources")}
          </h2>
          <p className="resources-subtitle">
            {t("freeToolsAndTemplatesToGrowYourBusiness")}
          </p>
          
          <div className="resources-grid">
            <div className="resource-card">
              <h3>📋 {t("businessPlanTemplate")}</h3>
              <p>{t("downloadOurFreeBusinessPlanTemplate")}</p>
              <button className="btn btn-outline">{t("download")}</button>
            </div>
            <div className="resource-card">
              <h3>📊 {t("marketingChecklist")}</h3>
              <p>{t("comprehensiveMarketingChecklistForLocalBusinesses")}</p>
              <button className="btn btn-outline">{t("download")}</button>
            </div>
            <div className="resource-card">
              <h3>💰 {t("pricingGuide")}</h3>
              <p>{t("howToPriceYourServicesCompetitively")}</p>
              <button className="btn btn-outline">{t("download")}</button>
            </div>
            <div className="resource-card">
              <h3>📱 {t("socialMediaTemplate")}</h3>
              <p>{t("readyToUseSocialMediaTemplatesForBusinesses")}</p>
              <button className="btn btn-outline">{t("download")}</button>
            </div>
          </div>
        </div>
      </section>
      <section className="social-proof-section" aria-labelledby="social-proof-title">
        <div className="container social-proof-container">
          <h2 id="social-proof-title" className="section-title social-proof-title">
            {t("localBusinessesJoiningBizCall")}
          </h2>
          <div className="social-proof-stats">
            <div className="social-proof-stat">
              <span className="social-proof-value">{aggregateStats.totalViews?.toLocaleString?.() ?? aggregateStats.totalViews ?? 0}</span>
              <span className="social-proof-label">{t("overViews").replace("{{count}}", aggregateStats.totalViews != null ? String(aggregateStats.totalViews) : "0")}</span>
            </div>
            <div className="social-proof-stat">
              <span className="social-proof-value">{aggregateStats.totalContacts?.toLocaleString?.() ?? aggregateStats.totalContacts ?? 0}</span>
              <span className="social-proof-label">{t("overContactAttempts").replace("{{count}}", aggregateStats.totalContacts != null ? String(aggregateStats.totalContacts) : "0")}</span>
            </div>
            {(aggregateStats.totalByPhone > 0 || aggregateStats.totalByEmail > 0 || aggregateStats.totalByWhatsapp > 0) && (
              <div className="social-proof-breakdown">
                {aggregateStats.totalByPhone > 0 && <span>📞 {aggregateStats.totalByPhone} {t("contactByPhone")}</span>}
                {aggregateStats.totalByEmail > 0 && <span>✉️ {aggregateStats.totalByEmail} {t("contactByEmail")}</span>}
                {aggregateStats.totalByWhatsapp > 0 && <span>💬 {aggregateStats.totalByWhatsapp} {t("contactByWhatsapp")}</span>}
              </div>
            )}
          </div>

          {/* Top 5 featured listings + analytics chart (real-time) */}
          {(aggregateStats.top5Featured?.length ?? 0) > 0 && (
            <div className="top-featured-section" aria-labelledby="top-featured-title">
              <h2 id="top-featured-title" className="section-title top-featured-title">
                {t("homeTopFeaturedTitle")}
              </h2>
              <p className="top-featured-subtitle">{t("homeTopFeaturedSubtitle")}</p>
              <div className="top-featured-layout">
                <ul className="top-featured-list" role="list">
                  {aggregateStats.top5Featured.map((item, idx) => (
                    <li key={item.id} className="top-featured-item">
                      <div className="top-featured-item-main">
                        <span className="top-featured-item-name">{item.name || t("listing")}</span>
                        <span className="top-featured-item-meta">
                          {t(item.category) || item.category} {item.city ? `• ${item.city}` : item.location ? `• ${item.location}` : ""}
                        </span>
                        <span className="top-featured-item-stats">
                          👁 {item.views ?? 0} · 📞 {item.contacts ?? 0}
                        </span>
                      </div>
                      <Link
                        href={`/listings/${item.id}`}
                        className="btn btn-primary btn-sm top-featured-view-btn"
                        aria-label={`${t("view")} ${item.name}`}
                      >
                        {t("view")}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div
                  className="top-featured-chart top-featured-line-chart"
                  role="img"
                  aria-label={t("homeTopFeaturedSubtitle")}
                  onMouseLeave={() => setChartActiveId(null)}
                >
                  {(() => {
                    const items = aggregateStats.top5Featured;
                    const lastMonthKey = aggregateStats.lastMonthKey || "";
                    const thisMonthKey = aggregateStats.thisMonthKey || "";
                    const formatMonth = (key) => {
                      if (!key || key.length < 7) return key;
                      const [y, m] = key.split("-");
                      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      return `${monthNames[parseInt(m, 10) - 1] || m} ${y}`;
                    };
                    const chartColors = [
                      { base: "#3b82f6", light: "#60a5fa" }, // Blue
                      { base: "#8b5cf6", light: "#a78bfa" }, // Purple
                      { base: "#f59e0b", light: "#fbbf24" }, // Amber/Orange
                      { base: "#10b981", light: "#34d399" }, // Green
                      { base: "#ef4444", light: "#f87171" }, // Red
                      { base: "#06b6d4", light: "#22d3ee" }, // Cyan
                      { base: "#ec4899", light: "#f472b6" }, // Pink
                      { base: "#6366f1", light: "#818cf8" }, // Indigo
                    ];
                    const series = items.map((item, idx) => {
                      const lastTotal = (item.lastMonthViews ?? 0) + (item.lastMonthContacts ?? 0);
                      const thisTotal = (item.views ?? 0) + (item.contacts ?? 0);
                      const increased = thisTotal >= lastTotal;
                      const colorSet = chartColors[idx % chartColors.length];
                      const shade = colorSet.base;
                      const shadeLight = colorSet.light;
                      return {
                        id: item.id,
                        name: item.name,
                        category: item.category,
                        city: item.city || item.location,
                        lastTotal,
                        thisTotal,
                        lastMonthViews: item.lastMonthViews ?? 0,
                        lastMonthContacts: item.lastMonthContacts ?? 0,
                        views: item.views ?? 0,
                        contacts: item.contacts ?? 0,
                        increased,
                        stroke: shade,
                        strokeLight: shadeLight,
                      };
                    });
                    const maxY = Math.max(1, ...series.flatMap((s) => [s.lastTotal, s.thisTotal]));
                    const padding = { left: 36, right: 16, top: 12, bottom: 28 };
                    const width = 280;
                    const height = 200;
                    const chartWidth = width - padding.left - padding.right;
                    const chartHeight = height - padding.top - padding.bottom;
                    const xScale = (i) => padding.left + (i / 1) * chartWidth;
                    const yScale = (v) => padding.top + chartHeight - (v / maxY) * chartHeight;
                    const activeSeries = series.find((s) => s.id === chartActiveId);
                    return (
                      <div className="top-featured-line-chart-inner">
                        <div className="top-featured-line-chart-y-label">{t("chartAmount")}</div>
                        <svg
                          width="100%"
                          height={height}
                          viewBox={`0 0 ${width} ${height}`}
                          preserveAspectRatio="xMidYMid meet"
                          className="top-featured-line-chart-svg"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setChartTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                          }}
                        >
                          <defs>
                            {series.map((s, idx) => (
                              <linearGradient key={s.id} id={`lineGrad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={s.stroke} />
                                <stop offset="100%" stopColor={s.strokeLight} />
                              </linearGradient>
                            ))}
                          </defs>
                          {/* Y-axis line */}
                          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} stroke="var(--border)" strokeWidth="1" />
                          {/* X-axis line */}
                          <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} stroke="var(--border)" strokeWidth="1" />
                          {/* Y-axis ticks */}
                          {[0, Math.ceil(maxY / 2), maxY].filter((v, i, a) => a.indexOf(v) === i).map((tick) => (
                            <g key={tick}>
                              <line x1={padding.left} y1={yScale(tick)} x2={padding.left + chartWidth} y2={yScale(tick)} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2" />
                              <text x={padding.left - 6} y={yScale(tick) + 4} textAnchor="end" fontSize="10" fill="var(--text-muted)">{tick}</text>
                            </g>
                          ))}
                          {/* X-axis labels */}
                          <text x={xScale(0)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{lastMonthKey ? formatMonth(lastMonthKey) : t("lastMonth")}</text>
                          <text x={xScale(1)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{thisMonthKey ? formatMonth(thisMonthKey) : t("thisMonth")}</text>
                          {/* Lines: one per listing — unique gradient, interactable */}
                          {series.map((s) => {
                            const xA = xScale(0);
                            const xB = xScale(1);
                            const yA = yScale(s.lastTotal);
                            const yB = yScale(s.thisTotal);
                            const isActive = chartActiveId === s.id;
                            return (
                              <g
                                key={s.id}
                                onMouseEnter={() => setChartActiveId(s.id)}
                                onClick={() => setChartActiveId((prev) => (prev === s.id ? null : s.id))}
                                style={{ cursor: "pointer" }}
                              >
                                {/* Invisible wide hit area */}
                                <line x1={xA} y1={yA} x2={xB} y2={yB} stroke="transparent" strokeWidth="16" strokeLinecap="round" />
                                <line
                                  x1={xA}
                                  y1={yA}
                                  x2={xB}
                                  y2={yB}
                                  stroke={`url(#lineGrad-${s.id})`}
                                  strokeWidth={isActive ? 4 : 2.5}
                                  strokeLinecap="round"
                                  className={s.increased ? "chart-line chart-line--increase" : "chart-line chart-line--decrease"}
                                />
                              </g>
                            );
                          })}
                          {/* Points at each data position */}
                          {series.map((s) => {
                            const isActive = chartActiveId === s.id;
                            return (
                              <g
                                key={`points-${s.id}`}
                                onMouseEnter={() => setChartActiveId(s.id)}
                                onClick={() => setChartActiveId((prev) => (prev === s.id ? null : s.id))}
                                style={{ cursor: "pointer" }}
                              >
                                <circle cx={xScale(0)} cy={yScale(s.lastTotal)} r={isActive ? 6 : 4} fill={s.stroke} stroke="var(--surface)" strokeWidth="1" />
                                <circle cx={xScale(1)} cy={yScale(s.thisTotal)} r={isActive ? 6 : 4} fill={s.stroke} stroke="var(--surface)" strokeWidth="1" />
                              </g>
                            );
                          })}
                        </svg>
                        {/* Tooltip / popover when hovering or clicking a line */}
                        {activeSeries && (
                          <div
                            className="top-featured-chart-tooltip"
                            role="tooltip"
                            aria-live="polite"
                            style={{ left: Math.min(chartTooltipPos.x + 12, 240), top: Math.min(chartTooltipPos.y, 140) }}
                          >
                            <div className="top-featured-chart-tooltip-name">{activeSeries.name || activeSeries.id}</div>
                            <div className="top-featured-chart-tooltip-meta">
                              {t(activeSeries.category) || activeSeries.category} {activeSeries.city ? `• ${activeSeries.city}` : ""}
                            </div>
                            <div className="top-featured-chart-tooltip-stats">
                              <span>{formatMonth(lastMonthKey) || t("lastMonth")}: 👁 {activeSeries.lastMonthViews} · 📞 {activeSeries.lastMonthContacts}</span>
                              <span>{formatMonth(thisMonthKey) || t("thisMonth")}: 👁 {activeSeries.views} · 📞 {activeSeries.contacts}</span>
                            </div>
                            <Link href={`/listings/${activeSeries.id}`} className="top-featured-chart-tooltip-link">
                              {t("view")} →
                            </Link>
                          </div>
                        )}
                        <div className="top-featured-line-chart-legend">
                          {series.slice(0, 5).map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              className={`top-featured-line-chart-legend-item ${chartActiveId === s.id ? "is-active" : ""}`}
                              onClick={() => setChartActiveId((prev) => (prev === s.id ? null : s.id))}
                              onMouseEnter={() => setChartActiveId(s.id)}
                              title={s.name}
                            >
                              <span className={`top-featured-line-chart-legend-dot ${s.increased ? "chart-line--increase" : "chart-line--decrease"}`} style={{ background: s.stroke }} />
                              {s.name?.slice(0, 14) || s.id}{s.name?.length > 14 ? "…" : ""}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section 
        className="how-it-works-section" 
        aria-labelledby="how-it-works-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="how-it-works-title" className="section-title">
              <span className="section-icon" aria-hidden="true">✨</span>
              {t("homeHowItWorksTitle")}
            </h2>
          </div>
          
          <div className="steps-grid" role="list">
            {[1, 2, 3].map((step) => (
              <article 
                key={step} 
                className="step-card"
                role="listitem"
              >
                <div className="step-number" aria-label={`${t("step")} ${step}`}>
                  {step}
                </div>
                <p className="step-description">
                  {step === 1
                    ? t("homeHowItWorksStep1")
                    : step === 2
                    ? t("homeHowItWorksStep2")
                    : t("homeHowItWorksStep3")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section 
        className="stats-section" 
        aria-labelledby="stats-title"
      >
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">📋</div>
              <div className="stat-content">
                <div className="stat-value">{activeListingCount || 0}</div>
                <div className="stat-label">{t("activeListings")}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">✓</div>
              <div className="stat-content">
                <div className="stat-value">{verifiedListingCount || 0}</div>
                <div className="stat-label">{t("verifiedListings")}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">👥</div>
              <div className="stat-content">
                <div className="stat-value">{publicListings?.length || 0}</div>
                <div className="stat-label">{t("publicListings")}</div>
              </div>
            </div>
          </div>
          <div className="stats-section-cta">
            <Link href="/listings" className="btn btn-primary stats-browse-btn">
              <span className="btn-icon" aria-hidden="true">🔍</span>
              {t("browseServicesCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS + FEATURES */}
      <section 
        className="features-section" 
        aria-labelledby="features-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="features-title" className="section-title">
              <span className="section-icon" aria-hidden="true">🌟</span>
              {t("whyChooseUs")}
            </h2>
          </div>
          
          <div className="trust-signals-grid">
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">📞</span>
              <span className="trust-signal-text">{t("trustDirectContact")}</span>
            </div>
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">↩️</span>
              <span className="trust-signal-text">{t("trustCancelAnytime")}</span>
            </div>
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">🇲🇰</span>
              <span className="trust-signal-text">{t("trustLocalPlatform")}</span>
            </div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🔒</div>
              <h3 className="feature-title">{t("verifiedListings")}</h3>
              <p className="feature-description">
                {t("verifiedListingsDesc")}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">💰</div>
              <h3 className="feature-title">{t("noCommissions")}</h3>
              <p className="feature-description">
                {t("noCommissionsDesc")}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">📱</div>
              <h3 className="feature-title">{t("easyContact")}</h3>
              <p className="feature-description">
                {t("easyContactDesc")}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">⭐</div>
              <h3 className="feature-title">{t("ratingsReviews")}</h3>
              <p className="feature-description">
                {t("ratingsReviewsDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES – compact by group */}
      <section 
        className="categories-section categories-section--compact" 
        aria-labelledby="categories-title"
      >
        <div className="container">
          <div className="categories-card card">
            <div className="section-header section-header--compact categories-header-row">
              <h2 id="categories-title" className="section-title section-title--compact">
                <span className="section-icon" aria-hidden="true">🎯</span>
                {t("homePopularCategoriesTitle")}
              </h2>
              <Link
                href="/listings"
                className="categories-browse-all"
                aria-label={t("browseAllCategories") || t("browse")}
              >
                {t("browseAllCategories") || t("browse")} →
              </Link>
            </div>
            
            <div 
              className="categories-by-group" 
              role="list"
              aria-label={t("popularCategories") || t("homePopularCategoriesTitle")}
            >
              {(categoryGroups || []).map((group) => (
                <div key={group.id} className="categories-group-block" role="listitem">
                  <span className="categories-group-label">{t(group.labelKey)}</span>
                  <div className="categories-group-chips">
                    {(group.categories || []).slice(0, categoriesPerGroup).map((cat) => (
                      <button
                        key={cat}
                        className="category-chip category-chip--compact"
                        onClick={() => handleCategoryClick(cat)}
                        aria-label={`${t("browse")} ${t(cat)} ${t("category")}`}
                        type="button"
                      >
                        <span className="category-icon" aria-hidden="true">
                          {categoryIcons?.[cat] ?? "🏷️"}
                        </span>
                        <span className="category-name">{t(cat) || cat}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
