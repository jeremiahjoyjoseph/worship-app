import { FC, Fragment, ReactNode, useState } from "react";

interface TabIcon {
  default: ReactNode;
  selected: ReactNode;
}
interface Tab {
  id: string;
  label: string;
  disabled: boolean;
  content: ReactNode;
  icon: TabIcon;
  badge: boolean;
}

interface TabsProps {
  tabs: Tab[];
  initialActiveTabId?: string;
  tabsContainerStyle: string;
  getBadgeCount: (tabId: string) => string;
}

const Tabs: FC<TabsProps> = ({
  tabs,
  initialActiveTabId,
  tabsContainerStyle,
  getBadgeCount,
}) => {
  // State to keep track of the active tab
  const [activeTabId, setActiveTabId] = useState<string>(
    initialActiveTabId || tabs[0].id
  );

  // Method to handle tab switching
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  // Find the active tab content
  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content;

  const getTabState = (tab: Tab) => {
    if (tab.disabled) {
      return "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500";
    } else {
      if (tab.id === activeTabId) {
        return "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group gap-2";
      } else {
        return "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group gap-2";
      }
    }
  };

  return (
    <div>
      <div
        className={`text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 ${tabsContainerStyle}`}
      >
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li
              className="me-2 cursor-pointer"
              key={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
            >
              <a className={getTabState(tab)}>
                {tab.icon ? (
                  <Fragment>
                    {tab.id === activeTabId
                      ? tab.icon.selected
                      : tab.icon.default}
                  </Fragment>
                ) : null}
                {tab.label}
                {tab.badge ? (
                  <TabBadge
                    isSelected={tab.id === activeTabId}
                    badgeCount={getBadgeCount(tab.id)}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">{activeTabContent}</div>
    </div>
  );
};

interface TabBadgeProps {
  isSelected: boolean;
  badgeCount: string;
}

const TabBadge: FC<TabBadgeProps> = ({ isSelected, badgeCount }) => {
  return (
    <div
      className={`inline-flex items-center justify-center w-6 h-6 text-sm font-semibold rounded-full  ${
        isSelected
          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          : "text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
      }`}
    >
      <span>{badgeCount}</span>
    </div>
  );
};

export default Tabs;
