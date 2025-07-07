"use client";
import { createContext, useContext, useState, type ReactNode} from "react";
import { LabelOptions } from "../../types";




export interface OptionsContextType {
	selectedOption: LabelOptions;
	setSelectedOption: (option: LabelOptions) => void;
}


const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export function OptionsProvider({ children }: { children: ReactNode }) {
  const [selectedOption, setSelectedOption] = useState<LabelOptions>(LabelOptions.WAREHOUSE);

  return (
    <OptionsContext.Provider value={{
			selectedOption,
			setSelectedOption,
		}}>{children}</OptionsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOptions() {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
}
