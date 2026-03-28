/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Wallet, 
  Send, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  CreditCard, 
  History,
  MoreHorizontal,
  CheckCircle2,
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  name: string;
  date: string;
  status: 'completed' | 'pending';
  avatar?: string;
}

export default function App() {
  const [balance, setBalance] = useState(222.26);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'send' | 'wallet' | 'activity'>('dashboard');
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'receive', amount: 222.26, name: 'Richard Carling', date: 'Today', status: 'completed' },
  ]);

  const handleSendMoney = () => {
    if (!sendAmount || !recipient) return;
    
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      const amount = parseFloat(sendAmount);
      setBalance(prev => prev - amount);
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'send',
        amount: amount,
        name: recipient,
        date: 'Just now',
        status: 'completed'
      };
      setTransactions([newTx, ...transactions]);
      setIsProcessing(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setShowSendModal(false);
        setSendAmount('');
        setRecipient('');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-[#2C2E2F]">
      {/* Navigation */}
      <nav className="bg-[#003087] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#003087] font-bold text-xl italic">P</span>
              </div>
              <span className="text-xl font-bold tracking-tight italic">Pay.Pal <span className="text-[#0070BA] font-normal not-italic">with Paga</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`hover:text-blue-200 transition-colors ${activeTab === 'dashboard' ? 'border-b-2 border-white pb-1' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('send')}
                className={`hover:text-blue-200 transition-colors ${activeTab === 'send' ? 'border-b-2 border-white pb-1' : ''}`}
              >
                Send & Request
              </button>
              <button 
                onClick={() => setActiveTab('wallet')}
                className={`hover:text-blue-200 transition-colors ${activeTab === 'wallet' ? 'border-b-2 border-white pb-1' : ''}`}
              >
                Wallet
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`hover:text-blue-200 transition-colors ${activeTab === 'activity' ? 'border-b-2 border-white pb-1' : ''}`}
              >
                Activity
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs opacity-70">Logged in as</span>
              <span className="text-sm font-bold">@sukaribayodeowei</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Settings size={20} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-full transition-colors text-sm font-medium">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Balance & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Pay.Pal Balance</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#2C2E2F]">${balance.toLocaleString()}</span>
                  <span className="text-lg text-gray-400 font-medium">USD</span>
                </div>
              </div>
              <div className="bg-[#E6F0FF] p-3 rounded-xl">
                <Wallet className="text-[#0070BA]" size={24} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowSendModal(true)}
                className="flex-1 min-w-[140px] bg-[#0070BA] hover:bg-[#005EA6] text-white font-bold py-3 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Money
              </button>
              <button className="flex-1 min-w-[140px] bg-white hover:bg-gray-50 text-[#0070BA] font-bold py-3 px-6 rounded-full border-2 border-[#0070BA] transition-all flex items-center justify-center gap-2">
                <ArrowDownLeft size={18} />
                Request
              </button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-lg">Recent Activity</h3>
              <button className="text-[#0070BA] font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'receive' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {tx.type === 'receive' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-[#2C2E2F]">{tx.name}</p>
                      <p className="text-xs text-gray-500">{tx.date} • {tx.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'receive' ? 'text-green-600' : 'text-[#2C2E2F]'}`}>
                      {tx.type === 'receive' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Cards & Banks */}
        <div className="space-y-6">
          {/* Paga Integration Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-black text-xs">PAGA</span>
              </div>
              <span className="font-bold tracking-tight">Error Not linked</span>
            </div>
            <p className="text-sm opacity-90 mb-4">Your Paga wallet is currently disconnected. Please re-authenticate to enable instant transfers.</p>
            <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg font-bold text-sm transition-colors">
              Fix Connection
            </button>
          </motion.div>

          {/* Banks and Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Banks and Cards</h3>
              <button className="text-[#0070BA] hover:bg-blue-50 p-1 rounded-full transition-colors">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-12 h-8 bg-[#003087] rounded flex items-center justify-center text-white font-bold italic text-xs">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Visa Debit</p>
                  <p className="text-xs text-gray-500">•••• 4242</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-[#0070BA] transition-colors" />
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  <CreditCard size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Mastercard</p>
                  <p className="text-xs text-gray-500">•••• 8812</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-[#0070BA] transition-colors" />
              </div>
            </div>

            <button className="w-full mt-6 text-[#0070BA] font-bold text-sm flex items-center justify-center gap-2 hover:underline">
              <CreditCard size={16} />
              Link a Card or Bank
            </button>
          </motion.div>

          {/* Security Tip */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex gap-4">
              <ShieldCheck className="text-[#0070BA] shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-sm text-[#003087] mb-1">Shop with Confidence</h4>
                <p className="text-xs text-[#003087]/70 leading-relaxed">Your eligible purchases are protected by Pay.Pal Buyer Protection.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Send Money Modal */}
      <AnimatePresence>
        {showSendModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setShowSendModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <h3 className="font-bold text-xl">Send Money</h3>
                <button 
                  onClick={() => setShowSendModal(false)}
                  disabled={isProcessing}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {showSuccess ? (
                  <div className="text-center py-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-[#2C2E2F] mb-2">Money Sent!</h4>
                    <p className="text-gray-500">You've successfully sent ${parseFloat(sendAmount).toFixed(2)} to {recipient}.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-1">Recipient Name or Email</label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" 
                          placeholder="Name, @username, or email"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0070BA] focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-1">Amount (USD)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0070BA] focus:bg-white rounded-2xl py-4 pl-10 pr-4 transition-all outline-none text-2xl font-bold"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={handleSendMoney}
                        disabled={!sendAmount || !recipient || isProcessing}
                        className="w-full bg-[#0070BA] hover:bg-[#005EA6] disabled:bg-gray-300 text-white font-bold py-4 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={20} />
                            Send Payment
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck size={14} />
                  Secure payment powered by Pay.Pal with Paga
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-[#003087] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs italic">P</span>
                </div>
                <span className="text-lg font-bold tracking-tight italic text-[#003087]">Pay.Pal <span className="text-[#0070BA] font-normal not-italic">with Paga</span></span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">The safer, easier way to pay and get paid. Integrated with Paga for seamless local and global transactions.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h5 className="font-bold text-sm">Help & Support</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="hover:text-[#0070BA] cursor-pointer">Help Center</li>
                  <li className="hover:text-[#0070BA] cursor-pointer">Contact Us</li>
                  <li className="hover:text-[#0070BA] cursor-pointer">Security</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="font-bold text-sm">About</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="hover:text-[#0070BA] cursor-pointer">Our Story</li>
                  <li className="hover:text-[#0070BA] cursor-pointer">Paga Partnership</li>
                  <li className="hover:text-[#0070BA] cursor-pointer">Careers</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="font-bold text-sm">Legal</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="hover:text-[#0070BA] cursor-pointer">Privacy</li>
                  <li className="hover:text-[#0070BA] cursor-pointer">Cookies</li>
                  <li className="hover:text-[#0070BA] cursor-pointer">User Agreement</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2026 Pay.Pal with Paga. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Accessibility</span>
              <span>Privacy</span>
              <span>Cookies</span>
              <span>Legal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
