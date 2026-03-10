import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, Search, RotateCcw, ArrowUpDown, ArrowUp, ArrowDown, RefreshCw, Copy, Check, X, SearchX, Plus, Pencil, History, Clock, Sun, Moon } from 'lucide-react';

// --- Mock Data ---
const mockData = [
  // Voeja
  { id: 1, consolidator: "Voeja", pcc: "U7JK", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["AA"], cabin: "Economy", direction: "Westbound", consolidatorFee: 0, markup: 10, conditions: "L0WJ AAA access" },
  { id: 2, consolidator: "Voeja", pcc: "U7JK", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["AA"], cabin: "Business", direction: "Eastbound", consolidatorFee: 75, markup: 25, conditions: "EMT01 / ENT15" },
  { id: 8, consolidator: "Voeja", pcc: "U7JK", tripType: "Regular", ageType: "Adult", fareType: "Private", airlines: ["DL"], cabin: "First", direction: "Westbound", consolidatorFee: 120, markup: 40, conditions: "VIP Client Access" },
  { id: 12, consolidator: "Voeja", pcc: "U7JK", tripType: "Refund", ageType: "Adult", fareType: "Corporate", airlines: ["IB"], cabin: "Economy", direction: "Westbound", consolidatorFee: 30, markup: 15, conditions: "Iberia Business Plus" },
  { id: 16, consolidator: "Voeja", pcc: "U7JK", tripType: "Regular", ageType: "Infant", fareType: "Tour", airlines: ["JJ"], cabin: "Economy", direction: "Eastbound", consolidatorFee: 0, markup: 5, conditions: "South America Special" },
  { id: 20, consolidator: "Voeja", pcc: "U7JK", tripType: "Change", ageType: "Adult", fareType: "Cruise", airlines: ["TP"], cabin: "Business", direction: "All", consolidatorFee: 110, markup: 30, conditions: "TAP Portugal Feed" },

  // Travel Edge
  { id: 3, consolidator: "Travel Edge", pcc: "5BOL", tripType: "Regular", ageType: "Adult", fareType: "Cruise", airlines: ["SQ"], cabin: "Economy", direction: "Westbound", consolidatorFee: 0, markup: 15, conditions: "All airlines" },
  { id: 4, consolidator: "Travel Edge", pcc: "5BOL", tripType: "Regular", ageType: "Adult", fareType: "Cruise", airlines: ["SQ"], cabin: "Business", direction: "Eastbound", consolidatorFee: 150, markup: 50, conditions: "All airlines" },
  { id: 9, consolidator: "Travel Edge", pcc: "5BOL", tripType: "Regular", ageType: "Infant", fareType: "Tour", airlines: ["UA"], cabin: "Economy", direction: "All", consolidatorFee: 0, markup: 10, conditions: "Bulk Fare" },
  { id: 13, consolidator: "Travel Edge", pcc: "5BOL", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["QF"], cabin: "Premium Economy", direction: "All", consolidatorFee: 85, markup: 20, conditions: "Oneworld Hub" },
  { id: 17, consolidator: "Travel Edge", pcc: "5BOL", tripType: "Regular", ageType: "Adult", fareType: "Corporate", airlines: ["AC"], cabin: "Business", direction: "All", consolidatorFee: 95, markup: 35, conditions: "Maple Leaf Access" },
  { id: 21, consolidator: "Travel Edge", pcc: "5BOL", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["QR"], cabin: "Economy", direction: "Westbound", consolidatorFee: 25, markup: 10, conditions: "Qatar Privilege" },

  // Martravel
  { id: 5, consolidator: "Martravel", pcc: "H05H", tripType: "Regular", ageType: "Adult", fareType: "Corporate", airlines: ["LH"], cabin: "Premium Economy", direction: "Westbound", consolidatorFee: 200, markup: 50, conditions: "L0WJ AAA access" },
  { id: 6, consolidator: "Martravel", pcc: "H05H", tripType: "Regular", ageType: "Adult", fareType: "Corporate", airlines: ["LH"], cabin: "Business", direction: "Eastbound", consolidatorFee: 600, markup: 100, conditions: "L0WJ AAA access" },
  { id: 10, consolidator: "Martravel", pcc: "H05H", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["AF"], cabin: "Business", direction: "Eastbound", consolidatorFee: 45, markup: 15, conditions: "SkyTeam Portal" },
  { id: 14, consolidator: "Martravel", pcc: "H05H", tripType: "Regular", ageType: "Adult", fareType: "Private", airlines: ["CX"], cabin: "First", direction: "All", consolidatorFee: 250, markup: 75, conditions: "Elite Tier Only" },
  { id: 18, consolidator: "Martravel", pcc: "H05H", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["VS"], cabin: "Premium Economy", direction: "Westbound", consolidatorFee: 40, markup: 20, conditions: "Virgin Atlantic Portal" },

  // Norad
  { id: 7, consolidator: "Norad", pcc: "36L9", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["BA"], cabin: "Economy", direction: "Eastbound", consolidatorFee: 10, markup: 5, conditions: "Standard Access" },
  { id: 11, consolidator: "Norad", pcc: "36L9", tripType: "Regular", ageType: "Adult", fareType: "Private", airlines: ["EK"], cabin: "Economy", direction: "Eastbound", consolidatorFee: 0, markup: 20, conditions: "GDS Direct" },
  { id: 15, consolidator: "Norad", pcc: "36L9", tripType: "Regular", ageType: "Adult", fareType: "Published", airlines: ["LX"], cabin: "Business", direction: "Westbound", consolidatorFee: 55, markup: 15, conditions: "Swiss Saver" },
  { id: 19, consolidator: "Norad", pcc: "36L9", tripType: "Regular", ageType: "Infant", fareType: "Private", airlines: ["AY"], cabin: "Economy", direction: "Eastbound", consolidatorFee: 15, markup: 5, conditions: "Helsinki Stopover" }
];

const mockActivityLog = [
  {
    id: 1,
    dateGroup: "Today",
    events: [
      {
        id: 101,
        user: "Sarah Jenkins",
        initials: "SJ",
        target: "Voeja (U7JK)",
        action: "updated",
        detail: (
          <>Consolidator Fee: <span className="line-through text-gray-400">$0.00</span> <span className="text-[var(--brand-primary)] font-medium mx-1">&rarr;</span> <span className="text-[var(--brand-primary)] font-medium">$10.00</span></>
        ),
        time: "10:42 AM"
      },
      {
        id: 102,
        user: "Marcus Chen",
        initials: "MC",
        target: "Travel Edge (5BOL)",
        action: "updated",
        detail: (
          <>Exchange Fee: <span className="line-through text-gray-400">$25.00</span> <span className="text-[var(--brand-primary)] font-medium mx-1">&rarr;</span> <span className="text-[var(--brand-primary)] font-medium">$35.00</span></>
        ),
        time: "09:15 AM"
      }
    ]
  },
  {
    id: 2,
    dateGroup: "Yesterday",
    events: [
      {
        id: 103,
        user: "Elena Rodriguez",
        initials: "ER",
        target: "Martravel (H05H)",
        action: "added rule",
        detail: (
          <>New rule for Corporate / LH / Premium Economy</>
        ),
        time: "04:30 PM"
      },
      {
        id: 104,
        user: "System",
        initials: "SY",
        target: "Norad (36L9)",
        action: "synced",
        detail: (
          <>Automated daily sync completed</>
        ),
        time: "02:00 AM"
      }
    ]
  }
];

// --- UI Components ---

const RibbonSelect = ({ value, options, onChange, prefix }: { value: string, options: string[], onChange: (val: string) => void, prefix: string }) => (
  <div className="relative h-9 w-full">
    <select
      className="w-full h-full appearance-none bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => <option key={opt} value={opt} className="bg-[var(--bg-surface)]">{prefix}: {opt}</option>)}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
  </div>
);

const Select = ({ value, options, onChange, placeholder }: { value?: string, options?: string[], onChange?: (val: string) => void, placeholder?: string }) => (
  <div className="relative h-full w-full">
    <select
      className="w-full h-full appearance-none bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm cursor-pointer"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {placeholder && <option value="" disabled className="bg-[var(--bg-surface)]">{placeholder}</option>}
      {options?.map(opt => <option key={opt} value={opt} className="bg-[var(--bg-surface)]">{opt}</option>)}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
  </div>
);

const SearchableSelect = ({ value, options, onChange, placeholder, icon: Icon }: { value?: string, options: string[], onChange: (val: string) => void, placeholder: string, icon?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative h-full w-full" ref={dropdownRef}>
      <div
        className="w-full h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md px-3 flex items-center justify-between cursor-pointer focus-within:ring-1 focus-within:ring-indigo-500 transition-shadow shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {Icon && <Icon className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />}
          <span className="truncate">{value || <span className="text-[var(--text-muted)]">{placeholder}</span>}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[60] w-full mt-1 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 border-b border-[var(--border-secondary)]">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--text-muted)]" />
              <input
                autoFocus
                type="text"
                className="w-full bg-[var(--bg-app)] text-xs border border-[var(--border-primary)] rounded px-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length > 0 ? filtered.map(opt => (
              <div
                key={opt}
                className="px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-light)] cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                {opt}
              </div>
            )) : (
              <div className="px-3 py-4 text-xs text-[var(--text-muted)] text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MultiSearchableSelect = ({ selected = [], options, onChange, placeholder }: { selected: string[], options: string[], onChange: (val: string[]) => void, placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()) && !selected.includes(opt));

  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
    setSearch('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="min-h-[36px] w-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md px-3 py-1.5 flex flex-wrap gap-1.5 items-center cursor-pointer focus-within:ring-1 focus-within:ring-indigo-500 transition-shadow shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          selected.map(s => (
            <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-[10px] font-bold rounded uppercase tracking-wider">
              {s}
              <X className="w-2.5 h-2.5 cursor-pointer hover:text-indigo-300" onClick={(e) => { e.stopPropagation(); toggleOption(s); }} />
            </span>
          ))
        ) : (
          <span className="text-[var(--text-muted)]">Search airlines...</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-[60] w-full mt-1 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-md shadow-xl overflow-hidden">
          <div className="p-2 border-b border-[var(--border-secondary)]">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--text-muted)]" />
              <input
                autoFocus
                type="text"
                className="w-full bg-[var(--bg-app)] text-xs border border-[var(--border-primary)] rounded px-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                placeholder="Type to filter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length > 0 ? filtered.map(opt => (
              <div
                key={opt}
                className="px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-light)] cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(opt);
                }}
              >
                {opt}
              </div>
            )) : (
              <div className="px-3 py-4 text-xs text-[var(--text-muted)] text-center">No available airlines found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const RibbonMultiSelect = ({ options, selected, onChange, prefix }: { options: string[], selected: string[], onChange: (selected: string[]) => void, prefix: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  let displayText = `${prefix}: All`;
  if (selected.length === 1) displayText = `${prefix}: ${selected[0]}`;
  else if (selected.length > 1) displayText = `${prefix}: ${selected.length} selected`;

  return (
    <div className="relative h-9 w-full" ref={dropdownRef}>
      <div
        className="w-full h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md px-3 flex items-center justify-between cursor-pointer focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-transparent transition-shadow shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate pr-2">{displayText}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[var(--bg-surface)] border border-[var(--border-primary)] rounded-md shadow-lg max-h-60 overflow-y-auto py-1">
          {options.map(opt => (
            <label key={opt} className="flex items-center px-3 py-2 hover:bg-[var(--border-secondary)] cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4 mr-2.5 shrink-0">
                <input
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 border border-[var(--border-primary)] rounded-sm bg-transparent checked:bg-[var(--brand-primary)] checked:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:ring-offset-1 focus:ring-offset-[var(--bg-surface)] transition-colors"
                  checked={selected.includes(opt)}
                  onChange={() => toggleOption(opt)}
                />
                <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
  <label className="flex items-center space-x-2 cursor-pointer group">
    <div className="relative flex items-center justify-center w-4 h-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer appearance-none w-4 h-4 border border-[var(--border-primary)] rounded-sm bg-transparent checked:bg-[var(--brand-primary)] checked:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:ring-offset-1 focus:ring-offset-[var(--bg-app)] transition-colors"
      />
      <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors tracking-tight">{label}</span>
  </label>
);

export default function App() {
  const [data, setData] = useState(mockData);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('Consolidator Fee');
  const [showAdult, setShowAdult] = useState(true);
  const [showInfant, setShowInfant] = useState(true);
  const [airlineInput, setAirlineInput] = useState('');
  const [selectedFareTypes, setSelectedFareTypes] = useState<string[]>(['Published']);
  const [selectedCabins, setSelectedCabins] = useState<string[]>([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);
  const [selectedDirection, setSelectedDirection] = useState('All');
  const [globalSearch, setGlobalSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<'consolidatorFee' | 'markup' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const airlineInputRef = useRef<HTMLInputElement>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [drawerTab, setDrawerTab] = useState<'details' | 'history'>('details');
  const [ruleForm, setRuleForm] = useState<any>({});
  const [createAnother, setCreateAnother] = useState(false);

  const handleResetFilters = () => {
    setAirlineInput('');
    setSelectedFareTypes(['Published']);
    setSelectedCabins([]);
    setSelectedTripTypes([]);
    setSelectedDirection('All');
    setGlobalSearch('');
    setShowAdult(true);
    setShowInfant(true);
    setSortColumn(null);
    setSortDirection('asc');
    setExpandedRows(new Set());
  };

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleCopy = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setCopiedId(id);
    setShowToast(true);
    setTimeout(() => {
      setCopiedId(null);
      setShowToast(false);
    }, 2000);
  };

  const handleSort = (column: 'consolidatorFee' | 'markup') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const mockHistory = [
    {
      date: 'Mar 8, 2026 • 14:30',
      user: 'System Admin',
      changes: [
        { field: 'Adult Fee', old: '$50.00', new: '$75.00' },
        { field: 'Conditions', old: 'None', new: 'EMT01 / ENT15' }
      ]
    },
    {
      date: 'Mar 1, 2026 • 09:15',
      user: 'Jane Doe',
      changes: [
        { field: 'Fare Type', old: 'Private', new: 'Published' }
      ]
    },
    {
      date: 'Feb 15, 2026 • 11:00',
      user: 'System Admin',
      changes: [
        { field: 'Rule Created', old: '', new: 'Initial Setup' }
      ]
    }
  ];

  const handleEdit = (e: React.MouseEvent, rule: any) => {
    e.stopPropagation();
    setEditingRule({ ...rule, history: mockHistory });
    setRuleForm({ ...rule });
    setDrawerTab('details');
    setIsDrawerOpen(true);
  };

  const handleHistory = (e: React.MouseEvent, rule: any) => {
    e.stopPropagation();
    setEditingRule({ ...rule, history: mockHistory });
    setRuleForm({ ...rule });
    setDrawerTab('history');
    setIsDrawerOpen(true);
  };

  const handleAddRule = () => {
    setEditingRule(null);
    setRuleForm({});
    setCreateAnother(false);
    setDrawerTab('details');
    setIsDrawerOpen(true);
  };

  const handleSaveRule = () => {
    if (editingRule) {
      setData(data.map(r => r.id === editingRule.id ? { ...editingRule, ...ruleForm } : r));
      setIsDrawerOpen(false);
    } else {
      const newId = Math.max(...data.map(d => d.id), 0) + 1;
      const newRule = {
        id: newId,
        ...ruleForm,
        consolidatorFee: Number(ruleForm.consolidatorFee) || 0,
        markup: Number(ruleForm.markup) || 0,
        ageType: ruleForm.ageType || 'Adult',
        tripType: ruleForm.tripType || 'Regular'
      };

      setData([...data, newRule]);

      if (createAnother) {
        setRuleForm({
          consolidator: ruleForm.consolidator,
          pcc: ruleForm.pcc,
          tripType: ruleForm.tripType,
          fareType: ruleForm.fareType,
          ageType: ruleForm.ageType === 'Adult' ? 'Infant' : 'Adult', // Proactive help for rapid entry
        });
      } else {
        setIsDrawerOpen(false);
      }
    }
  };

  const handleDeleteRule = () => {
    if (editingRule) {
      setData(data.filter(r => r.id !== editingRule.id));
      setIsDrawerOpen(false);
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(row => {
      // Global Search filter
      if (globalSearch) {
        const searchLower = globalSearch.toLowerCase();
        if (!row.pcc.toLowerCase().includes(searchLower) && !row.consolidator.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Filter by Airline - matching any in the airlines list
      if (airlineInput) {
        const query = airlineInput.toUpperCase();
        const matches = row.airlines?.some(a => a.toUpperCase().includes(query)) || row.pcc.toUpperCase().includes(query);
        if (!matches) return false;
      }

      // Fare Type filter
      if (selectedFareTypes.length > 0) {
        if (!selectedFareTypes.includes(row.fareType)) return false;
      }

      // Cabin filter
      if (selectedCabins.length > 0) {
        if (!selectedCabins.includes(row.cabin)) return false;
      }

      // Trip Type filter
      if (selectedTripTypes.length > 0) {
        if (!selectedTripTypes.includes(row.tripType)) return false;
      }

      // Age Type filter
      if (!showAdult && row.ageType === 'Adult') return false;
      if (!showInfant && row.ageType === 'Infant') return false;

      // Direction filter
      if (selectedDirection !== 'All' && row.direction !== selectedDirection) return false;

      return true;
    });

    if (sortColumn) {
      filtered.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, airlineInput, selectedFareTypes, selectedCabins, selectedTripTypes, selectedDirection, globalSearch, sortColumn, sortDirection, showAdult, showInfant]);

  const formatFee = (fee: number) => {
    if (fee === 0) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(fee);
  };

  const SortIcon = ({ column }: { column: 'consolidatorFee' | 'markup' }) => {
    if (sortColumn !== column) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40 hover:opacity-100 transition-opacity" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 ml-1" /> : <ArrowDown className="w-3 h-3 ml-1" />;
  };

  return (
    <div className="h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand-primary)]/30 selection:text-[var(--brand-light)] flex flex-col overflow-hidden">

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-8 flex flex-col space-y-6 overflow-hidden">

        {/* Premium Header & Breadcrumbs */}
        <header className="shrink-0 flex items-end justify-between z-30">
          <div>
            <div className="text-xs text-[var(--text-secondary)] mb-1">
              Home <span className="mx-1">/</span> Knowledge portal <span className="mx-1">/</span> <span className="text-[var(--text-primary)] font-medium">Consolidator Fees</span> <span className="text-[var(--text-muted)] font-normal ml-1">(Synced: Today, 08:30 AM)</span>
            </div>
            <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">Consolidator Fees</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative h-9">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm cursor-pointer"
              >
                <option value="Consolidator Fee" className="bg-[var(--bg-surface)]">Action: Consolidator Fee</option>
                <option value="Exchange" className="bg-[var(--bg-surface)]">Action: Exchange Penalty</option>
                <option value="Refund" className="bg-[var(--bg-surface)]">Action: Refund Penalty</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            <div className="relative w-64 h-9">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search PCC or Consolidator..."
                className="w-full h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsActivityLogOpen(true)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors h-9"
            >
              <Clock className="w-4 h-4" />
              Activity
            </button>
            <button
              onClick={handleAddRule}
              className="bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-app)] text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors h-9 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Rule
            </button>
          </div>
        </header>

        {/* Section A: Control Panel (High-Density Command Ribbon) */}
        <section className="shrink-0 z-20">

          {/* Row 1: The Filter Ribbon */}
          <div className="flex flex-row flex-wrap xl:flex-nowrap items-center gap-3 w-full">
            <div className="relative w-[240px] h-9 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                ref={airlineInputRef}
                type="text"
                value={airlineInput}
                onChange={(e) => setAirlineInput(e.target.value)}
                placeholder="Airline (e.g. AA, SQ)..."
                className="w-full h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md pl-9 pr-8 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm"
              />
              {airlineInput && (
                <button
                  onClick={() => { setAirlineInput(''); airlineInputRef.current?.focus(); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="w-[200px] shrink-0">
              <RibbonMultiSelect prefix="Fare" selected={selectedFareTypes} onChange={setSelectedFareTypes} options={["Published", "Cruise", "Corporate", "Private", "Tour"]} />
            </div>
            <div className="w-[160px] shrink-0">
              <RibbonMultiSelect prefix="Cabin" selected={selectedCabins} onChange={setSelectedCabins} options={['Economy', 'Premium Economy', 'Business', 'First']} />
            </div>
            <div className="w-[180px] shrink-0">
              <RibbonMultiSelect prefix="Trip" selected={selectedTripTypes} onChange={setSelectedTripTypes} options={['Regular', 'Refund', 'Change']} />
            </div>
            <div className="w-[160px] shrink-0">
              <RibbonSelect prefix="Direction" value={selectedDirection} onChange={setSelectedDirection} options={['All', 'Westbound', 'Eastbound']} />
            </div>
            <div className="flex items-center space-x-4 shrink-0 px-2">
              <Checkbox label="Adult" checked={showAdult} onChange={setShowAdult} />
              <Checkbox label="Infant" checked={showInfant} onChange={setShowInfant} />
            </div>
            <div className="w-24 h-9 shrink-0">
              <Select value="USD" options={['USD', 'EUR', 'GBP', 'CAD']} />
            </div>
            <button
              onClick={handleResetFilters}
              title="Reset Filters"
              className="flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] transition-colors group h-8 w-8 rounded-full shrink-0 ml-auto"
            >
              <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-300" />
            </button>
          </div>

        </section>

        {/* Section B: Data Grid */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <section className="flex-1 rounded-xl border border-[var(--border-primary)] shadow-2xl overflow-hidden flex flex-col bg-[var(--bg-app)]">
            <div className="overflow-x-auto overflow-y-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="sticky top-0 z-10 bg-[var(--bg-app)]/80 backdrop-blur-md shadow-sm">
                  <tr className="border-b border-[var(--border-primary)]">
                    <th className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Consolidator</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">PCC</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Trip / Age</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Fare Type</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Airlines</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Itinerary</th>
                    <th
                      className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors group"
                      onClick={() => handleSort('consolidatorFee')}
                    >
                      <div className="flex items-center justify-end">
                        Consolidator Fee
                        <SortIcon column="consolidatorFee" />
                      </div>
                    </th>
                    <th
                      className="px-6 py-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors group"
                      onClick={() => handleSort('markup')}
                    >
                      <div className="flex items-center justify-end">
                        Markup
                        <SortIcon column="markup" />
                      </div>
                    </th>
                    <th className="px-4 py-3.5 w-10"></th>
                  </tr>
                </thead>
                <tbody className="">
                  {filteredAndSortedData.map((row, index) => {
                    // Determine if this is the first row of a new consolidator group
                    const isFirstInGroup = index === 0 || filteredAndSortedData[index - 1].consolidator !== row.consolidator;

                    // Calculate group size for rowspan
                    let groupSize = 0;
                    if (isFirstInGroup) {
                      for (let i = index; i < filteredAndSortedData.length; i++) {
                        if (filteredAndSortedData[i].consolidator === row.consolidator) {
                          groupSize += 1;
                          if (expandedRows.has(filteredAndSortedData[i].id)) {
                            groupSize += 1; // Account for expanded row
                          }
                        } else {
                          break;
                        }
                      }
                    }

                    const isLastInGroup = index === filteredAndSortedData.length - 1 || filteredAndSortedData[index + 1].consolidator !== row.consolidator;

                    return (
                      <React.Fragment key={row.id}>
                        <tr className="border-b border-[var(--border-secondary)] hover:bg-[var(--border-secondary)] transition-colors group/row">
                          {isFirstInGroup && (
                            <td className="px-6 py-4 bg-[var(--bg-app)]" rowSpan={groupSize}>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-[var(--text-primary)] tracking-tight">{row.consolidator}</span>
                              </div>
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-secondary)] font-mono">
                              {row.pcc}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[var(--text-primary)] font-medium">{row.tripType}</span>
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${row.ageType === 'Adult' ? 'bg-[var(--brand-light)]' : 'bg-[var(--color-error)]'}`}></span>
                                <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">{row.ageType}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[var(--text-primary)] font-medium">{row.fareType}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-[120px]">
                              {row.airlines?.map(a => (
                                <span key={a} className="inline-flex items-center px-1.5 py-0.5 bg-[var(--brand-primary)]/10 text-[var(--brand-light)] text-[10px] font-bold rounded uppercase tracking-wider">
                                  {a}
                                </span>
                              ))}
                              {(!row.airlines || row.airlines.length === 0) && <span className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest">All</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[var(--text-primary)] font-medium">{row.cabin}</span>
                              <span className="text-xs text-[var(--text-secondary)]">{row.direction}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-mono text-sm ${row.consolidatorFee > 0 ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-muted)] opacity-40'}`}>
                              {formatFee(row.consolidatorFee)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-mono text-sm ${row.markup > 0 ? 'text-[var(--color-success)] font-semibold' : 'text-[var(--text-muted)] opacity-40'}`}>
                              {formatFee(row.markup)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right pr-6">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => handleHistory(e, row)}
                                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] rounded-md transition-all"
                                title="View History"
                              >
                                <History className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleEdit(e, row)}
                                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] rounded-md transition-all"
                                title="Edit Rule"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleCopy(e, row.id)}
                                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] rounded-md transition-all"
                                title="Copy ID"
                              >
                                {copiedId === row.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
                              <button
                                onClick={() => toggleRow(row.id)}
                                className={`p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${expandedRows.has(row.id) ? 'rotate-180' : ''}`}
                              >
                                <ChevronDown className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRows.has(row.id) && (
                          <tr className={`bg-[var(--bg-surface)] ${isLastInGroup ? 'border-b border-[var(--border-secondary)]' : ''}`}>
                            <td colSpan={8} className="px-6 py-4">
                              <div className="border-l-2 border-[var(--brand-primary)] pl-4 animate-in slide-in-from-top-1 duration-200">
                                <div className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1">Internal Conditions / Notes</div>
                                <div className="text-sm text-[var(--text-primary)] leading-relaxed max-w-2xl">
                                  {row.conditions || "No additional conditions specified for this rule."}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
              {filteredAndSortedData.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                  <SearchX className="w-8 h-8 text-[var(--text-muted)] mb-4" />
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">No fees found</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] max-w-sm">We couldn't find any consolidator fees matching your current filters.</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-6 px-4 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--border-secondary)] hover:bg-[var(--border-primary)] rounded-md transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

      </main>

      {/* Rule Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-[480px] bg-[var(--bg-app)] border-l border-[var(--border-primary)] h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex flex-col border-b border-[var(--border-secondary)] shrink-0">
              <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  {editingRule ? (
                    <>Edit Rule <span className="text-[var(--text-muted)] mx-1">&bull;</span> {editingRule.pcc}</>
                  ) : (
                    'New Consolidator Rule'
                  )}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {editingRule && (
                <div className="flex px-6 gap-6">
                  <button
                    onClick={() => setDrawerTab('details')}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${drawerTab === 'details' ? 'text-[var(--brand-light)] border-[var(--brand-light)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent'}`}
                  >
                    Rule Details
                  </button>
                  <button
                    onClick={() => setDrawerTab('history')}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${drawerTab === 'history' ? 'text-[var(--brand-light)] border-[var(--brand-light)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent'}`}
                  >
                    Audit History
                  </button>
                </div>
              )}
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {drawerTab === 'details' ? (
                <>
                  {/* Section A: Identity */}
                  <div className="border-b border-[var(--border-secondary)] pb-6 mb-6">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-widest opacity-60">Section A: Identity</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Consolidator</label>
                        <div className="h-9">
                          <Select placeholder="Select consolidator" options={['Voeja', 'Travel Edge', 'Martravel', 'Norad']} value={ruleForm?.consolidator || ''} onChange={(val) => setRuleForm({ ...ruleForm, consolidator: val })} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">PCC</label>
                        <div className="h-9">
                          <SearchableSelect
                            placeholder="Search PCC..."
                            options={['U7JK', '5BOL', 'H05H', '36L9', 'G4F8', 'K9W2']}
                            value={ruleForm?.pcc || ''}
                            onChange={(val) => setRuleForm({ ...ruleForm, pcc: val })}
                            icon={Search}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Rule Parameters */}
                  <div className="border-b border-[var(--border-secondary)] pb-6 mb-6">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-widest opacity-60">Section B: Rule Parameters</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Trip Type</label>
                          <div className="h-9">
                            <Select options={['Regular', 'Refund', 'Change']} value={ruleForm?.tripType || 'Regular'} onChange={(val) => setRuleForm({ ...ruleForm, tripType: val })} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Age Type</label>
                          <div className="h-9">
                            <Select options={['Adult', 'Infant']} value={ruleForm?.ageType || 'Adult'} onChange={(val) => setRuleForm({ ...ruleForm, ageType: val })} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Fare Type</label>
                        <div className="h-9">
                          <Select options={['Published', 'Cruise', 'Corporate', 'Private', 'Tour']} value={ruleForm?.fareType || ''} onChange={(val) => setRuleForm({ ...ruleForm, fareType: val })} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Airlines</label>
                        <MultiSearchableSelect
                          placeholder="Search airlines..."
                          options={['AA', 'SQ', 'LH', 'BA', 'DL', 'UA', 'AF', 'EK', 'IB', 'QF', 'CX', 'LX', 'JJ', 'AC', 'VS', 'AY', 'TP', 'QR']}
                          selected={ruleForm?.airlines || []}
                          onChange={(vals) => setRuleForm({ ...ruleForm, airlines: vals })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Itinerary</label>
                        <div className="flex gap-4 h-9">
                          <Select placeholder="Cabin" options={['Economy', 'Premium Economy', 'Business', 'First']} value={ruleForm?.cabin || ''} onChange={(val) => setRuleForm({ ...ruleForm, cabin: val })} />
                          <Select placeholder="Direction" options={['Westbound', 'Eastbound', 'All']} value={ruleForm?.direction || ''} onChange={(val) => setRuleForm({ ...ruleForm, direction: val })} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section C: Financials */}
                  <div className="border-b border-[var(--border-secondary)] pb-6 mb-6">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-widest opacity-60">Section C: Financials</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Consolidator Fee</label>
                          <div className="relative h-9">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">$</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              value={ruleForm?.consolidatorFee ?? ''}
                              onChange={(e) => setRuleForm({ ...ruleForm, consolidatorFee: e.target.value })}
                              className="w-full h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] font-mono text-sm rounded-md pl-7 pr-3 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Markup</label>
                          <div className="relative h-9">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">$</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              value={ruleForm?.markup ?? ''}
                              onChange={(e) => setRuleForm({ ...ruleForm, markup: e.target.value })}
                              className="w-full h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] font-mono text-sm rounded-md pl-7 pr-3 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section D: Meta */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-widest opacity-60">Section D: Meta</h3>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Conditions / Notes</label>
                      <textarea
                        placeholder="Internal notes, tour codes..."
                        value={ruleForm?.conditions || ''}
                        onChange={(e) => setRuleForm({ ...ruleForm, conditions: e.target.value })}
                        className="w-full h-20 bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm resize-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-0 pt-2">
                  {editingRule?.history?.map((event: any, index: number) => (
                    <div key={index} className="flex flex-col border-l-2 border-[var(--border-primary)] ml-2 pl-4 pb-8 relative last:border-l-transparent last:pb-0">
                      <div className="absolute w-2.5 h-2.5 bg-indigo-500 rounded-full -left-[5px] top-1 ring-4 ring-[var(--bg-app)]"></div>
                      <div className="text-xs text-[var(--text-muted)] mb-2">
                        {event.date} <span className="mx-1 text-[var(--text-muted)]">by</span> <span className="font-medium text-[var(--text-secondary)]">{event.user}</span>
                      </div>
                      <div className="space-y-2">
                        {event.changes.map((change: any, i: number) => (
                          <div key={i} className="text-sm text-[var(--text-secondary)]">
                            {change.field}:
                            {change.old && <span className="line-through text-[var(--text-muted)] mx-1">{change.old}</span>}
                            <span className="text-[var(--brand-light)] font-medium">&rarr; {change.new}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            <div className="mt-auto border-t border-[var(--border-primary)] p-4 bg-[var(--bg-app)] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                {editingRule ? (
                  <div className="flex items-center gap-3">
                    <button onClick={handleDeleteRule} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                      Delete Rule
                    </button>
                    <button
                      onClick={() => {
                        const cloned = { ...ruleForm, id: undefined };
                        setEditingRule(null);
                        setRuleForm(cloned);
                      }}
                      title="Duplicate Rule"
                      className="p-1.5 text-[var(--text-muted)] hover:text-[var(--brand-light)] hover:bg-[var(--brand-primary)]/10 rounded-md transition-all"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <input
                        type="checkbox"
                        checked={createAnother}
                        onChange={(e) => setCreateAnother(e.target.checked)}
                        className="peer appearance-none w-4 h-4 border border-[var(--border-primary)] rounded-sm bg-transparent checked:bg-[var(--brand-primary)] checked:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:ring-offset-1 focus:ring-offset-[var(--bg-app)] transition-colors"
                      />
                      <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Create another</span>
                  </label>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRule}
                  className="bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-app)] shadow-sm text-sm font-medium px-4 py-2 rounded-md transition-colors"
                >
                  {editingRule ? 'Update Rule' : 'Save Rule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Activity Drawer (Slide-over) */}
      {isActivityLogOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsActivityLogOpen(false)}
          />
          <div className="relative w-[540px] bg-[var(--bg-app)] border-l border-[var(--border-primary)] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 ease-out">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-secondary)] shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">Global Activity Log</h2>
                <div className="relative h-8">
                  <select className="h-full bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-secondary)] text-xs rounded-md pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] focus:border-transparent transition-shadow shadow-sm cursor-pointer">
                    <option className="bg-[var(--bg-surface)]">Last 30 Days</option>
                    <option className="bg-[var(--bg-surface)]">Last 7 Days</option>
                    <option className="bg-[var(--bg-surface)]">Today</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
                </div>
              </div>
              <button
                onClick={() => setIsActivityLogOpen(false)}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-secondary)] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {mockActivityLog.map((group) => (
                <div key={group.id} className="mb-8 last:mb-0">
                  <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4 mt-2">
                    {group.dateGroup}
                  </div>
                  <div className="space-y-6 relative">
                    {group.events.map((event) => (
                      <div key={event.id} className="relative flex items-start gap-4">
                        {/* Timeline Line (Subtle left border connection) */}
                        <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-[var(--border-secondary)] last:hidden"></div>

                        {/* Avatar */}
                        <div className="relative z-10 shrink-0 bg-[var(--bg-app)] border border-[var(--border-primary)] text-[var(--text-secondary)] text-xs font-medium w-8 h-8 flex items-center justify-center rounded-full ring-4 ring-[var(--bg-app)]">
                          {event.initials}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1.5 pb-2">
                          <div className="text-sm text-[var(--text-secondary)]">
                            <span className="font-medium text-[var(--text-primary)]">{event.user}</span> {event.action} <span className="font-medium text-[var(--text-primary)]">{event.target}</span>
                          </div>
                          <div className="text-sm mt-1 text-[var(--text-muted)]">
                            {event.detail}
                          </div>
                          <div className="text-xs text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-8 bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-sm font-medium">Record ID copied to clipboard</span>
        </div>
      )}

      {/* Theme Toggle FAB */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--bg-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] group"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 text-[var(--brand-light)] group-hover:-rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
}
