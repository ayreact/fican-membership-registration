export interface BankItem {
  name: string;
  code?: string;
  category?: 'Commercial' | 'Digital / Fintech' | 'Microfinance' | 'Merchant / Other';
  aliases?: string[];
}

// Popular and Tier-1 Commercial Banks & Fintechs at the top for instant discovery
export const POPULAR_BANKS: BankItem[] = [
  { name: 'Access Bank', code: '044', category: 'Commercial', aliases: ['access', 'diamond'] },
  { name: 'First Bank of Nigeria', code: '011', category: 'Commercial', aliases: ['firstbank', 'fbn'] },
  { name: 'Guaranty Trust Bank (GTB)', code: '058', category: 'Commercial', aliases: ['gtb', 'gtbank', 'gtco'] },
  { name: 'United Bank for Africa (UBA)', code: '033', category: 'Commercial', aliases: ['uba'] },
  { name: 'Zenith Bank', code: '057', category: 'Commercial', aliases: ['zenith'] },
  { name: 'OPay Digital Services', code: '999992', category: 'Digital / Fintech', aliases: ['opay', 'paycom'] },
  { name: 'PalmPay', code: '999991', category: 'Digital / Fintech', aliases: ['palmpay'] },
  { name: 'Moniepoint Microfinance Bank', code: '50515', category: 'Digital / Fintech', aliases: ['moniepoint', 'teamapt'] },
  { name: 'Kuda Bank', code: '50211', category: 'Digital / Fintech', aliases: ['kuda'] },
  { name: 'Fidelity Bank', code: '070', category: 'Commercial', aliases: ['fidelity'] },
  { name: 'Stanbic IBTC Bank', code: '221', category: 'Commercial', aliases: ['stanbic', 'ibtc'] },
  { name: 'First City Monument Bank (FCMB)', code: '214', category: 'Commercial', aliases: ['fcmb'] },
  { name: 'Sterling Bank', code: '232', category: 'Commercial', aliases: ['sterling'] },
  { name: 'Union Bank of Nigeria', code: '032', category: 'Commercial', aliases: ['union'] },
  { name: 'Wema Bank / ALAT', code: '035', category: 'Commercial', aliases: ['wema', 'alat'] },
  { name: 'Ecobank Nigeria', code: '050', category: 'Commercial', aliases: ['ecobank'] },
  { name: 'Polaris Bank', code: '076', category: 'Commercial', aliases: ['polaris', 'skye'] },
  { name: 'Keystone Bank', code: '082', category: 'Commercial', aliases: ['keystone', 'bankphb'] },
];

// Comprehensive CBN-verified Nigerian Banks & Financial Institutions
export const ALL_VERIFIED_BANKS: BankItem[] = [
  ...POPULAR_BANKS,
  // Commercial & Merchant Banks
  { name: 'Citibank Nigeria', code: '023', category: 'Commercial', aliases: ['citi'] },
  { name: 'Globus Bank', code: '00103', category: 'Commercial', aliases: ['globus'] },
  { name: 'Heritage Bank', code: '030', category: 'Commercial', aliases: ['heritage'] },
  { name: 'Jaiz Bank', code: '301', category: 'Commercial', aliases: ['jaiz'] },
  { name: 'Lotus Bank', code: '303', category: 'Commercial', aliases: ['lotus'] },
  { name: 'Optimus Bank', code: '107', category: 'Commercial', aliases: ['optimus'] },
  { name: 'Parallex Bank', code: '526', category: 'Commercial', aliases: ['parallex'] },
  { name: 'PremiumTrust Bank', code: '105', category: 'Commercial', aliases: ['premium'] },
  { name: 'Providus Bank', code: '101', category: 'Commercial', aliases: ['providus'] },
  { name: 'Signature Bank', code: '106', category: 'Commercial', aliases: ['signature'] },
  { name: 'Standard Chartered Bank', code: '068', category: 'Commercial', aliases: ['standard chartered', 'scb'] },
  { name: 'SunTrust Bank', code: '100', category: 'Commercial', aliases: ['suntrust'] },
  { name: 'TAJBank', code: '302', category: 'Commercial', aliases: ['taj'] },
  { name: 'Titan Trust Bank', code: '102', category: 'Commercial', aliases: ['titan'] },
  { name: 'Unity Bank', code: '215', category: 'Commercial', aliases: ['unity'] },
  { name: 'Coronation Merchant Bank', code: '559', category: 'Merchant / Other', aliases: ['coronation'] },
  { name: 'FBNQuest Merchant Bank', code: '560', category: 'Merchant / Other', aliases: ['fbnquest'] },
  { name: 'FSDH Merchant Bank', code: '501', category: 'Merchant / Other', aliases: ['fsdh'] },
  { name: 'Nova Merchant Bank', code: '561', category: 'Merchant / Other', aliases: ['nova'] },
  { name: 'Rand Merchant Bank', code: '502', category: 'Merchant / Other', aliases: ['rmb', 'rand'] },

  // Digital Banks & Payment Service Banks
  { name: '9mobile 9Payment Service Bank (9PSB)', code: '120001', category: 'Digital / Fintech', aliases: ['9psb', '9mobile'] },
  { name: 'Airtel Smartcash PSB', code: '120004', category: 'Digital / Fintech', aliases: ['smartcash', 'airtel'] },
  { name: 'Carbon (One Finance)', code: '565', category: 'Digital / Fintech', aliases: ['carbon', 'paylater'] },
  { name: 'FairMoney Microfinance Bank', code: '51318', category: 'Digital / Fintech', aliases: ['fairmoney'] },
  { name: 'Gomoney', code: '100022', category: 'Digital / Fintech', aliases: ['gomoney'] },
  { name: 'Hope PSBank', code: '120002', category: 'Digital / Fintech', aliases: ['hope'] },
  { name: 'Momo Payment Service Bank (MTN)', code: '120003', category: 'Digital / Fintech', aliases: ['momo', 'mtn'] },
  { name: 'Paga', code: '100002', category: 'Digital / Fintech', aliases: ['paga'] },
  { name: 'Raven Bank', code: '51310', category: 'Digital / Fintech', aliases: ['raven'] },
  { name: 'Rubies Bank', code: '125', category: 'Digital / Fintech', aliases: ['rubies'] },
  { name: 'Sparkle Microfinance Bank', code: '51310', category: 'Digital / Fintech', aliases: ['sparkle'] },
  { name: 'VFD Microfinance Bank', code: '566', category: 'Digital / Fintech', aliases: ['vfd', 'vbank'] },

  // Prominent Microfinance & Mortgage Banks
  { name: 'Abbey Mortgage Bank', code: '404', category: 'Microfinance' },
  { name: 'Accion Microfinance Bank', code: '602', category: 'Microfinance' },
  { name: 'AG Mortgage Bank', code: '90077', category: 'Microfinance' },
  { name: 'Amju Unique MFB', code: '50926', category: 'Microfinance' },
  { name: 'ASO Savings and Loans', code: '401', category: 'Microfinance' },
  { name: 'Bowen Microfinance Bank', code: '50931', category: 'Microfinance' },
  { name: 'CEMCS Microfinance Bank', code: '50823', category: 'Microfinance' },
  { name: 'Chanelle Microfinance Bank', code: '50171', category: 'Microfinance' },
  { name: 'Consumer Microfinance Bank', code: '50910', category: 'Microfinance' },
  { name: 'Corestep MFB', code: '50204', category: 'Microfinance' },
  { name: 'Covenant Microfinance Bank', code: '50706', category: 'Microfinance' },
  { name: 'Ekondo Microfinance Bank', code: '562', category: 'Microfinance' },
  { name: 'Empire Trust MFB', code: '50285', category: 'Microfinance' },
  { name: 'FCMB Easy Account', code: '100031', category: 'Microfinance' },
  { name: 'Federal University Dutse MFB', code: '50898', category: 'Microfinance' },
  { name: 'Fidfund MFB', code: '50743', category: 'Microfinance' },
  { name: 'First Generation Mortgage Bank', code: '414', category: 'Microfinance' },
  { name: 'Gateway Mortgage Bank', code: '110005', category: 'Microfinance' },
  { name: 'Hackman Microfinance Bank', code: '51251', category: 'Microfinance' },
  { name: 'Hasal Microfinance Bank', code: '50383', category: 'Microfinance' },
  { name: 'Ibile Microfinance Bank', code: '51244', category: 'Microfinance' },
  { name: 'Ikoyi Obalende MFB', code: '50439', category: 'Microfinance' },
  { name: 'Infinity Microfinance Bank', code: '50442', category: 'Microfinance' },
  { name: 'Infinity Trust Mortgage Bank', code: '070016', category: 'Microfinance' },
  { name: 'Kadpoly MFB', code: '50502', category: 'Microfinance' },
  { name: 'Lagos Building Investment Company', code: '90052', category: 'Microfinance' },
  { name: 'Lapo Microfinance Bank', code: '50549', category: 'Microfinance' },
  { name: 'LivingTrust Mortgage Bank', code: '070017', category: 'Microfinance' },
  { name: 'Mainstreet Microfinance Bank', code: '50645', category: 'Microfinance' },
  { name: 'Mint Finex MFB', code: '50304', category: 'Microfinance' },
  { name: 'Mutual Benefits MFB', code: '50604', category: 'Microfinance' },
  { name: 'NPF Microfinance Bank', code: '50629', category: 'Microfinance' },
  { name: 'Peace Microfinance Bank', code: '50711', category: 'Microfinance' },
  { name: 'Personal Trust MFB', code: '51146', category: 'Microfinance' },
  { name: 'Platinum Mortgage Bank', code: '268', category: 'Microfinance' },
  { name: 'Quickfund MFB', code: '51293', category: 'Microfinance' },
  { name: 'Refuge Mortgage Bank', code: '90067', category: 'Microfinance' },
  { name: 'Rephidim Microfinance Bank', code: '50761', category: 'Microfinance' },
  { name: 'Safe Haven MFB', code: '51113', category: 'Microfinance' },
  { name: 'Seedvest Microfinance Bank', code: '50822', category: 'Microfinance' },
  { name: 'Shield MFB', code: '50582', category: 'Microfinance' },
  { name: 'Stellas MFB', code: '51253', category: 'Microfinance' },
  { name: 'TCF MFB', code: '51211', category: 'Microfinance' },
  { name: 'Trustbond Mortgage Bank', code: '523', category: 'Microfinance' },
  { name: 'Unical MFB', code: '50840', category: 'Microfinance' },
  { name: 'Venture Garden Group (VGG)', code: '50956', category: 'Microfinance' },
  { name: 'Wetland Microfinance Bank', code: '50871', category: 'Microfinance' },
  { name: 'Xslnce Microfinance Bank', code: '50893', category: 'Microfinance' },
  { name: 'Yes Microfinance Bank', code: '50943', category: 'Microfinance' },
];

// Helper to fetch live list from Paystack's verified CBN endpoint with instant fallback
export async function fetchLiveNigerianBanks(): Promise<BankItem[]> {
  try {
    const cached = sessionStorage.getItem('fican_ng_banks_cache');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    const response = await fetch('https://api.paystack.co/bank?country=nigeria', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return ALL_VERIFIED_BANKS;
    }

    const json = await response.json();
    if (json.status && Array.isArray(json.data)) {
      const liveList: BankItem[] = json.data
        .filter((b: { active?: boolean; is_deleted?: boolean }) => b.active && !b.is_deleted)
        .map((b: { name: string; code?: string; slug?: string }) => ({
          name: b.name.trim(),
          code: b.code,
          category: 'Microfinance',
          aliases: b.slug ? [b.slug.replace(/-ng$/, '').replace(/-/g, ' ')] : [],
        }));

      // Merge with POPULAR_BANKS at top
      const popularNames = new Set(POPULAR_BANKS.map((b) => b.name.toLowerCase()));
      const others = liveList.filter((b) => !popularNames.has(b.name.toLowerCase()));

      // Sort others alphabetically
      others.sort((a, b) => a.name.localeCompare(b.name));

      const merged = [...POPULAR_BANKS, ...others];
      sessionStorage.setItem('fican_ng_banks_cache', JSON.stringify(merged));
      return merged;
    }
  } catch (error) {
    console.warn('Using offline verified Nigerian banks list:', error);
  }

  return ALL_VERIFIED_BANKS;
}
