import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FarmTask, FarmRecord } from '../types';

interface FarmContextType {
  tasks: FarmTask[];
  records: FarmRecord[];
  bookmarkedGuideIds: string[];
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<FarmTask, 'id' | 'completed'>) => void;
  deleteTask: (taskId: string) => void;
  addRecord: (rec: Omit<FarmRecord, 'id'>) => void;
  toggleBookmark: (guideId: string) => void;
  isBookmarked: (guideId: string) => boolean;
}

const initialTasks: FarmTask[] = [
  {
    id: 'tsk-1',
    title: 'Top-dress Maize Field Plot A with CAN (50kg/acre)',
    plotName: 'Plot A (Maize - Knee High)',
    dueDate: '2026-10-15',
    priority: 'High',
    completed: false,
    category: 'Fertilizer',
  },
  {
    id: 'tsk-2',
    title: 'Vaccinate heifer calves for Foot & Mouth Disease (FMD)',
    plotName: 'Dairy Unit Pens',
    dueDate: '2026-10-18',
    priority: 'High',
    completed: false,
    category: 'Vaccination',
  },
  {
    id: 'tsk-3',
    title: 'Scout cabbage and kale for Diamondback Moth & Aphids',
    plotName: 'Kitchen Garden & Plot B',
    dueDate: '2026-10-13',
    priority: 'Medium',
    completed: true,
    category: 'Spraying',
  },
  {
    id: 'tsk-4',
    title: 'Check drip irrigation filter flush and pressure valves',
    plotName: 'Greenhouse Tomatoes',
    dueDate: '2026-10-20',
    priority: 'Medium',
    completed: false,
    category: 'Feeding',
  },
];

const initialRecords: FarmRecord[] = [
  {
    id: 'rec-1',
    date: '2026-10-09',
    type: 'Income',
    category: 'Harvest Sale',
    amount: 32000,
    description: 'Sold 800 Liters evening/morning bulk milk to New KCC cooler @ KES 40/L',
  },
  {
    id: 'rec-2',
    date: '2026-10-07',
    type: 'Expense',
    category: 'Vet / Feeds',
    amount: 14500,
    description: 'Purchased 5 bags of Dairy Meal 16% CP + 2 mineral salt licks',
  },
  {
    id: 'rec-3',
    date: '2026-10-04',
    type: 'Expense',
    category: 'Labor',
    amount: 8000,
    description: 'Casual labor for manual weeding 2 acres maize plot',
  },
  {
    id: 'rec-4',
    date: '2026-09-28',
    type: 'Income',
    category: 'Harvest Sale',
    amount: 45000,
    description: 'Supplied 15 crates of Greenhouse Anna F1 Tomatoes to Eldoret wholesale market',
  },
];

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<FarmTask[]>(() => {
    try {
      const saved = localStorage.getItem('agri_farm_tasks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialTasks;
  });

  const [records, setRecords] = useState<FarmRecord[]>(() => {
    try {
      const saved = localStorage.getItem('agri_farm_records');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialRecords;
  });

  const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agri_farm_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['crop-maize', 'live-dairy', 'pest-fall-armyworm'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('agri_farm_tasks', JSON.stringify(tasks));
      localStorage.setItem('agri_farm_records', JSON.stringify(records));
      localStorage.setItem('agri_farm_bookmarks', JSON.stringify(bookmarkedGuideIds));
    } catch {
      // ignore
    }
  }, [tasks, records, bookmarkedGuideIds]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (task: Omit<FarmTask, 'id' | 'completed'>) => {
    const newTask: FarmTask = {
      ...task,
      id: `tsk-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const addRecord = (rec: Omit<FarmRecord, 'id'>) => {
    const newRecord: FarmRecord = {
      ...rec,
      id: `rec-${Date.now()}`,
    };
    setRecords((prev) => [newRecord, ...prev]);
  };

  const toggleBookmark = (guideId: string) => {
    setBookmarkedGuideIds((prev) =>
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId]
    );
  };

  const isBookmarked = (guideId: string) => bookmarkedGuideIds.includes(guideId);

  return (
    <FarmContext.Provider
      value={{
        tasks,
        records,
        bookmarkedGuideIds,
        toggleTask,
        addTask,
        deleteTask,
        addRecord,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = (): FarmContextType => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
