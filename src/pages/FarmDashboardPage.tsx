import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import type { FarmTask, FarmRecord } from '../types';
import {
  Layers,
  CheckCircle2,
  Circle,
  PlusCircle,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const FarmDashboardPage: React.FC = () => {
  const { tasks, records, toggleTask, addTask, deleteTask, addRecord } = useFarm();
  const { user } = useAuth();

  // Task form
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPlot, setTaskPlot] = useState('');
  const [taskDue, setTaskDue] = useState('2026-10-25');
  const [taskPriority, setTaskPriority] = useState<FarmTask['priority']>('High');
  const [taskCategory, setTaskCategory] = useState<FarmTask['category']>('Fertilizer');

  // Record form
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recType, setRecType] = useState<FarmRecord['type']>('Income');
  const [recCategory, setRecCategory] = useState<FarmRecord['category']>('Harvest Sale');
  const [recAmount, setRecAmount] = useState('');
  const [recDesc, setRecDesc] = useState('');

  // Financial calculations
  const totalIncome = records
    .filter((r) => r.type === 'Income')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = records
    .filter((r) => r.type === 'Expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskPlot.trim()) return;
    addTask({
      title: taskTitle.trim(),
      plotName: taskPlot.trim(),
      dueDate: taskDue,
      priority: taskPriority,
      category: taskCategory,
    });
    setTaskTitle('');
    setTaskPlot('');
    setShowTaskModal(false);
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(recAmount);
    if (!amt || !recDesc.trim()) return;
    addRecord({
      date: new Date().toISOString().split('T')[0],
      type: recType,
      category: recCategory,
      amount: amt,
      description: recDesc.trim(),
    });
    setRecAmount('');
    setRecDesc('');
    setShowRecordModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Farm Operations Logbook & Ledger
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Tracking field chores, livestock calendar, and farm cashflow for {user.name} ({user.county}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTaskModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Chores</span>
          </button>
          <button
            onClick={() => setShowRecordModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Cashflow</span>
          </button>
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Total Farm Income</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-800">
            KES {totalIncome.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400">Milk, produce & livestock sales</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Total Expenses</span>
            <TrendingDown className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-rose-700">
            KES {totalExpense.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400">Seed, fertilizer, feeds & labor</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Net Operating Margin</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div
            className={`text-2xl font-serif font-bold ${
              netBalance >= 0 ? 'text-emerald-900' : 'text-rose-900'
            }`}
          >
            KES {netBalance.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400">Current season cash profit</p>
        </div>
      </div>

      {/* Two columns: Field Tasks & Cash Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Tasks List */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-stone-900">
              Pending Farm Chores & Calendar
            </h2>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              {tasks.filter((t) => !t.completed).length} Pending
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  task.completed ? 'bg-stone-50/80 border-stone-200 opacity-60' : 'bg-white border-stone-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 text-stone-400 hover:text-emerald-700 transition"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <h4
                      className={`text-xs font-bold text-stone-900 ${
                        task.completed ? 'line-through text-stone-500' : ''
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {task.plotName} • Due: {task.dueDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      task.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-stone-300 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Cashflow Ledger */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-stone-900">
              Cashflow & Expense Ledger
            </h2>
            <span className="text-xs text-stone-500">{records.length} Transactions</span>
          </div>

          <div className="space-y-2.5">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        rec.type === 'Income'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {rec.type}
                    </span>
                    <span className="font-bold text-stone-900">{rec.category}</span>
                    <span className="text-stone-400 text-[10px]">{rec.date}</span>
                  </div>
                  <p className="text-stone-600 mt-0.5 line-clamp-1">{rec.description}</p>
                </div>

                <div
                  className={`font-serif font-bold text-sm shrink-0 ${
                    rec.type === 'Income' ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {rec.type === 'Income' ? '+' : '-'}KES {rec.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateTask}
            className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-serif font-bold text-base">Schedule Farm Chore</h3>
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="text-stone-400"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Vaccinate heifers against FMD"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Plot / Shed Location</label>
              <input
                type="text"
                required
                placeholder="e.g. Dairy Barn or Plot B"
                value={taskPlot}
                onChange={(e) => setTaskPlot(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={taskDue}
                  onChange={(e) => setTaskDue(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Priority</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Record Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateRecord}
            className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-serif font-bold text-base">Record Cash Flow</h3>
              <button
                type="button"
                onClick={() => setShowRecordModal(false)}
                className="text-stone-400"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Type</label>
                <select
                  value={recType}
                  onChange={(e) => setRecType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                >
                  <option value="Income">Income (Revenue)</option>
                  <option value="Expense">Expense (Cost)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Amount (KES)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={recAmount}
                  onChange={(e) => setRecAmount(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
              <input
                type="text"
                required
                placeholder="e.g. Sold 400L evening milk to cooperative"
                value={recDesc}
                onChange={(e) => setRecDesc(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
