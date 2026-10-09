import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { ScrumTask } from '../../types';
import {
  Kanban,
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const ScrumBoardPage: React.FC = () => {
  const { scrumTasks, setScrumTasks, addToast } = useTheme();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState<ScrumTask['priority']>('High');
  const [taskTag, setTaskTag] = useState('Core Feature');
  const [taskColumn, setTaskColumn] = useState<ScrumTask['columnId']>('backlog');

  const columns: { id: ScrumTask['columnId']; title: string; color: string }[] = [
    { id: 'backlog', title: 'Backlog Queue', color: 'border-slate-700' },
    { id: 'in-progress', title: 'In Active Development', color: 'border-cyan-500/50' },
    { id: 'review', title: 'Security & QA Review', color: 'border-amber-500/50' },
    { id: 'done', title: 'Deployed to Production', color: 'border-emerald-500/50' },
  ];

  const moveTask = (taskId: string, direction: 'left' | 'right') => {
    const colOrder: ScrumTask['columnId'][] = ['backlog', 'in-progress', 'review', 'done'];

    setScrumTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const currentIndex = colOrder.indexOf(t.columnId);
          const nextIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
          if (nextIndex >= 0 && nextIndex < colOrder.length) {
            return { ...t, columnId: colOrder[nextIndex] };
          }
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setScrumTasks((prev) => prev.filter((t) => t.id !== taskId));
    addToast({
      type: 'info',
      title: 'Task Removed',
      message: 'Scrum card deleted from board.',
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: ScrumTask = {
      id: 'task-' + Date.now(),
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      priority: taskPriority,
      tag: taskTag.trim(),
      columnId: taskColumn,
      assignee: { name: 'Operator Zero', avatar: 'OP' },
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    };

    setScrumTasks((prev) => [newTask, ...prev]);

    addToast({
      type: 'success',
      title: 'Scrum Task Added',
      message: `Card "${taskTitle}" added to ${taskColumn}.`,
    });

    setTaskTitle('');
    setTaskDesc('');
    setIsAddTaskModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Scrum Kanban Board</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              SPRINT 42
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Drag, organize, and transition sprint tickets with priority badges, assignees, and persistent localStorage state.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            + New Scrum Task
          </button>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const tasksInCol = scrumTasks.filter((t) => t.columnId === col.id);

          return (
            <div
              key={col.id}
              className={`cyber-card p-3 rounded-lg border ${col.color} bg-[#0c121d] flex flex-col min-h-[500px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {col.title}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                  {tasksInCol.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {tasksInCol.map((task) => {
                  const priorityStyles = {
                    Critical: 'border-rose-500/40 text-rose-400 bg-rose-950/40',
                    High: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
                    Medium: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
                    Low: 'border-slate-700 text-slate-400 bg-slate-900',
                  }[task.priority];

                  return (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border border-slate-800 bg-[#080d16] hover:border-slate-700 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${priorityStyles}`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {task.tag}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100 leading-snug">
                        {task.title}
                      </h4>

                      {task.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold">
                            {task.assignee.avatar}
                          </span>
                          <span className="text-slate-400 text-[10px] font-mono">{task.dueDate}</span>
                        </div>

                        {/* Move Actions */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'backlog' && (
                            <button
                              onClick={() => moveTask(task.id, 'left')}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                              title="Move Left"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              onClick={() => moveTask(task.id, 'right')}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                              title="Move Right"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Add Sprint Kanban Task"
        size="md"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Task Directive Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement WebAuthn FIDO2 Biometric Fallback"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Description &amp; Acceptance Criteria
            </label>
            <textarea
              rows={3}
              placeholder="Detailed task specifications and edge cases..."
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Priority
              </label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Kanban Column
              </label>
              <select
                value={taskColumn}
                onChange={(e) => setTaskColumn(e.target.value as any)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="backlog">Backlog Queue</option>
                <option value="in-progress">In Active Development</option>
                <option value="review">Security &amp; QA Review</option>
                <option value="done">Deployed to Production</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Tag / Microservice
            </label>
            <input
              type="text"
              placeholder="e.g. POS Suite, Backend, UI/UX"
              value={taskTag}
              onChange={(e) => setTaskTag(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
            >
              Create Scrum Card
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
