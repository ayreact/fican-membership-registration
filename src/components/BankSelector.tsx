import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Building2,
  ChevronDown,
  Search,
  Check,
  X,
  Edit3,
  ListFilter,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';
import {
  POPULAR_BANKS,
  ALL_VERIFIED_BANKS,
  fetchLiveNigerianBanks,
  type BankItem,
} from '../data/nigerianBanks';

interface BankSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  id?: string;
}

export const BankSelector: React.FC<BankSelectorProps> = ({
  value,
  onChange,
  error,
  id = 'bankName',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [banks, setBanks] = useState<BankItem[]>(ALL_VERIFIED_BANKS);
  const [isManualMode, setIsManualMode] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fetch updated live Paystack list in background
  useEffect(() => {
    let isMounted = true;
    fetchLiveNigerianBanks()
      .then((liveList) => {
        if (isMounted && liveList && liveList.length > 0) {
          setBanks(liveList);
        }
      })
      .catch((err) => console.warn('Could not sync live bank list:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openDropdown = () => {
    setSearchQuery('');
    setHighlightedIndex(0);
    setIsOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      openDropdown();
    }
  };

  // Focus manual input when switched to manual mode
  useEffect(() => {
    if (isManualMode) {
      setTimeout(() => {
        manualInputRef.current?.focus();
      }, 50);
    }
  }, [isManualMode]);

  // Filtered banks based on search query
  const filteredBanks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return banks;
    }

    return banks.filter((bank) => {
      const nameMatch = bank.name.toLowerCase().includes(query);
      const aliasMatch = bank.aliases?.some((a) => a.toLowerCase().includes(query));
      const codeMatch = bank.code?.includes(query);
      return nameMatch || aliasMatch || codeMatch;
    });
  }, [banks, searchQuery]);

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredBanks.length - 1 ? prev + 1 : prev
      );
      scrollItemIntoView(highlightedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      scrollItemIntoView(highlightedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredBanks.length > 0 && filteredBanks[highlightedIndex]) {
        handleSelectBank(filteredBanks[highlightedIndex].name);
      } else if (searchQuery.trim()) {
        handleSelectBank(searchQuery.trim());
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const scrollItemIntoView = (index: number) => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.bank-option-item');
      if (items[index]) {
        (items[index] as HTMLElement).scrollIntoView({
          block: 'nearest',
        });
      }
    }
  };

  const handleSelectBank = (bankName: string) => {
    onChange(bankName);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    openDropdown();
  };

  const handleSwitchToManual = () => {
    setIsManualMode(true);
    setIsOpen(false);
  };

  const handleSwitchToSelector = () => {
    setIsManualMode(false);
    setIsOpen(false);
  };

  return (
    <div className="bank-selector-container" ref={containerRef}>
      {/* Mode toggle link header */}
      <div className="bank-selector-subhead">
        <span className="bank-selector-caption">
          {isManualMode ? (
            <span className="mode-tag manual">Custom Text Mode</span>
          ) : (
            <span className="mode-tag verified">
              <ShieldCheck size={13} /> CBN Verified Directory ({banks.length}+)
            </span>
          )}
        </span>

        <button
          type="button"
          onClick={isManualMode ? handleSwitchToSelector : handleSwitchToManual}
          className="bank-mode-toggle-btn"
        >
          {isManualMode ? (
            <>
              <ListFilter size={13} /> Switch to verified bank selector
            </>
          ) : (
            <>
              <Edit3 size={13} /> Can&apos;t find bank? Type manually
            </>
          )}
        </button>
      </div>

      {isManualMode ? (
        /* Manual Text Input Mode */
        <div className="bank-manual-input-wrap">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id={id}
              ref={manualInputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. Kuda Bank, OPay, Microfinance Bank name..."
              className={`input-field ${error ? 'input-error' : ''}`}
              style={{ paddingLeft: '2.5rem', paddingRight: value ? '2.5rem' : '1rem' }}
            />
            <Building2
              size={17}
              className="bank-input-icon"
              style={{ position: 'absolute', left: 12, top: 14, color: '#6b7280' }}
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="bank-input-clear-btn"
                title="Clear bank name"
                style={{ position: 'absolute', right: 12, top: 12 }}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <p className="bank-help-text">
            Type your bank or financial institution name exactly as it appears on your statement.
          </p>
        </div>
      ) : (
        /* Searchable Bank Selector Mode */
        <div className="bank-combobox-wrap" onKeyDown={handleKeyDown}>
          {/* Main Display Trigger */}
          <button
            type="button"
            id={id}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={toggleDropdown}
            className={`bank-trigger-btn ${error ? 'input-error' : ''} ${isOpen ? 'is-open' : ''}`}
          >
            <div className="bank-trigger-content">
              <Building2 size={18} className="bank-trigger-icon" />
              {value ? (
                <span className="bank-trigger-text selected">{value}</span>
              ) : (
                <span className="bank-trigger-text placeholder">
                  Select or search your bank...
                </span>
              )}
            </div>

            <div className="bank-trigger-actions">
              {value && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleClear(e as unknown as React.MouseEvent);
                  }}
                  className="bank-trigger-clear"
                  title="Clear selection"
                >
                  <X size={15} />
                </span>
              )}
              <ChevronDown
                size={18}
                className={`bank-trigger-chevron ${isOpen ? 'rotate' : ''}`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="bank-dropdown-menu" role="listbox">
              {/* Search Bar */}
              <div className="bank-dropdown-search-wrap">
                <Search size={16} className="bank-dropdown-search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to filter banks (e.g. GTB, Zenith, OPay, Kuda)..."
                  className="bank-dropdown-search-input"
                  onClick={(e) => e.stopPropagation()}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="bank-dropdown-search-clear"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Popular Banks Shortcut Bar (shown when not searching) */}
              {!searchQuery && (
                <div className="bank-quick-picks">
                  <div className="bank-quick-picks-label">Quick select:</div>
                  <div className="bank-quick-picks-tags">
                    {POPULAR_BANKS.slice(0, 6).map((pop) => (
                      <button
                        key={pop.name}
                        type="button"
                        onClick={() => handleSelectBank(pop.name)}
                        className={`bank-quick-tag ${value === pop.name ? 'is-active' : ''}`}
                      >
                        {pop.name.replace(/\s*\(.*?\)\s*/g, '')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Banks List */}
              <div className="bank-options-list" ref={listRef}>
                {filteredBanks.length > 0 ? (
                  filteredBanks.map((bank, index) => {
                    const isSelected = value === bank.name;
                    const isHighlighted = highlightedIndex === index;
                    return (
                      <div
                        key={bank.name + (bank.code || index)}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectBank(bank.name)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`bank-option-item ${isSelected ? 'selected' : ''} ${
                          isHighlighted ? 'highlighted' : ''
                        }`}
                      >
                        <div className="bank-option-info">
                          <span className="bank-option-name">{bank.name}</span>
                          {bank.category && (
                            <span className={`bank-category-badge ${bank.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                              {bank.category}
                            </span>
                          )}
                        </div>
                        {isSelected && <Check size={16} className="bank-option-check" />}
                      </div>
                    );
                  })
                ) : (
                  <div className="bank-no-results">
                    <p className="no-result-text">
                      No bank found matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectBank(searchQuery.trim())}
                      className="bank-use-custom-btn"
                    >
                      <PlusCircle size={15} />
                      Use &ldquo;{searchQuery.trim()}&rdquo; as my bank
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown Footer */}
              <div className="bank-dropdown-footer">
                <span className="bank-footer-verified">
                  <ShieldCheck size={13} /> Verified against Central Bank of Nigeria registry
                </span>
                <button
                  type="button"
                  onClick={handleSwitchToManual}
                  className="bank-footer-manual-link"
                >
                  Type custom bank
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
