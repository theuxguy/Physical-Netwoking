import clsx from "clsx";
import imgListViewListItemTemplate from "figma:asset/6fe59f9e5bd66f179cc9702a2ce89241be5d9fd2.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <p style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'lnum', 'tnum'" }} className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      {children}
    </p>
  );
}

function ListItemTemplate({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Emphasis + LIT">
            <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Columns + Actions">
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Private/❗️List item Layout">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleSelectMenu21BVertical02Active() {
  return (
    <div className="absolute h-[180px] right-px top-[8px] w-[9px]">
      <div className="absolute inset-0 overflow-clip" data-name="Vertical / 02. Active">
        <div className="-translate-x-1/2 absolute bg-[#161513] bottom-[2px] left-1/2 rounded-[3px] top-[2px] w-[3px]" />
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return <Wrapper additionalClassNames="leading-[16px] text-[13.75px]">{text}</Wrapper>;
}
type OverlinePrimarySecondaryTextProps = {
  text: string;
  additionalClassNames?: string;
};

function OverlinePrimarySecondaryText({ text, additionalClassNames = "" }: OverlinePrimarySecondaryTextProps) {
  return (
    <div className={clsx("content-stretch flex flex-[1_0_0] flex-col font-['OracleBrand_VF_Tb:Regular',sans-serif] font-normal items-start justify-center min-h-px min-w-px relative text-[#161513]", additionalClassNames)}>
      <Wrapper additionalClassNames="leading-[20px] text-[16px]">{`Primary text `}</Wrapper>
      <Text text={text} />
    </div>
  );
}

function AvatarLightImage() {
  return (
    <div className="relative rounded-[6px] shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center relative">
          <div className="relative shrink-0 size-[44px]" data-name="Women/Alicia Gallardo">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgListViewListItemTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type HelperbuttonImageAndTextProps = {
  text: string;
};

function HelperbuttonImageAndText({ text }: HelperbuttonImageAndTextProps) {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative w-full">
      <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Leading">
        <AvatarLightImage />
        <OverlinePrimarySecondaryText text={text} additionalClassNames="text-left" />
      </div>
    </div>
  );
}
type AddToListMenuItemHelperProps = {
  additionalClassNames?: string;
};

function AddToListMenuItemHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<AddToListMenuItemHelperProps>) {
  return (
    <div className={clsx("content-stretch flex items-center px-[16px] py-[12px] relative", additionalClassNames)}>
      <ListItemTemplate>{children}</ListItemTemplate>
    </div>
  );
}
type AddToListMenuItemProps = {
  className?: string;
  state?: "Enabled" | "Hover" | "Hover on text";
};

function AddToListMenuItem({ className, state = "Enabled" }: AddToListMenuItemProps) {
  const isHoverOrHoverOnText = ["Hover", "Hover on text"].includes(state);
  return (
    <div className={className || "relative w-[350px]"}>
      <div className={`content-stretch flex items-start relative w-full ${isHoverOrHoverOnText ? "" : "flex-col"}`}>
        {isHoverOrHoverOnText && (
          <button className="bg-[rgba(22,21,19,0.08)] cursor-pointer flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="List View - List Item Template">
            <div className="flex flex-row items-center size-full">
              <AddToListMenuItemHelper additionalClassNames="gap-[16px] size-full">
                <HelperbuttonImageAndText text="Secondary text" />
              </AddToListMenuItemHelper>
            </div>
          </button>
        )}
        {state === "Enabled" && (
          <div className="relative shrink-0 w-full" data-name="List View - List Item Template">
            <div className="flex flex-row items-center size-full">
              <AddToListMenuItemHelper additionalClassNames="gap-[8px] w-full">
                <div className="content-stretch flex gap-[24px] items-center relative w-full">
                  <OverlinePrimarySecondaryText text="Secondary text" />
                </div>
              </AddToListMenuItemHelper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
type SingleSelectMenuItemProps = {
  className?: string;
  groupName?: boolean;
  state?: "Enabled" | "Hover" | "Selected" | "Disabled";
};

function SingleSelectMenuItem({ className, groupName = false, state = "Enabled" }: SingleSelectMenuItemProps) {
  const isDisabledAndGroupName = state === "Disabled" && groupName;
  const isDisabledAndNotGroupName = state === "Disabled" && !groupName;
  const isEnabledAndGroupName = state === "Enabled" && groupName;
  const isEnabledAndNotGroupName = state === "Enabled" && !groupName;
  const isHoverAndNotGroupName = state === "Hover" && !groupName;
  const isSelectedAndGroupName = state === "Selected" && groupName;
  const isSelectedAndNotGroupName = state === "Selected" && !groupName;
  return (
    <div className={className || "relative w-[350px]"}>
      <div className={`content-stretch flex items-start relative w-full ${!groupName && ["Selected", "Hover"].includes(state) ? "" : "flex-col"}`}>
        {(isEnabledAndNotGroupName || isEnabledAndGroupName || isSelectedAndGroupName || isDisabledAndNotGroupName || isDisabledAndGroupName || isSelectedAndNotGroupName) && (
          <div className={`relative ${isSelectedAndNotGroupName ? "bg-[#e4f1f7] flex-[1_0_0] h-[48px] min-h-px min-w-px" : isSelectedAndGroupName ? "bg-[#e4f1f7] shrink-0 w-full" : "shrink-0 w-full"}`} data-name="List View - List Item Template">
            <div className="flex flex-row items-center size-full">
              <div className={`content-stretch flex items-center px-[16px] py-[12px] relative ${isSelectedAndNotGroupName ? "gap-[16px] size-full" : isSelectedAndGroupName ? "gap-[16px] w-full" : "gap-[8px] w-full"}`}>
                <ListItemTemplate>
                  <div className="content-stretch flex gap-[24px] items-center relative w-full">
                    {(isEnabledAndNotGroupName || isEnabledAndGroupName || isDisabledAndNotGroupName || isDisabledAndGroupName) && (
                      <div className={`content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative ${isEnabledAndGroupName || isDisabledAndNotGroupName || isDisabledAndGroupName ? 'font-["OracleBrand_VF_Tb:Regular",sans-serif] font-normal text-[#161513]' : ""}`} data-name="Overline + Primary + Secondary">
                        <p className={`leading-[20px] relative shrink-0 text-[16px] w-full ${isEnabledAndGroupName || isDisabledAndNotGroupName || isDisabledAndGroupName ? "" : 'font-["OracleBrand_VF_Tb:Regular",sans-serif] font-normal text-[#161513]'}`} style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'lnum', 'tnum'" }}>
                          {isEnabledAndGroupName || isDisabledAndNotGroupName || isDisabledAndGroupName ? "Primary text " : "Menu item"}
                        </p>
                        {(isEnabledAndGroupName || isDisabledAndNotGroupName || isDisabledAndGroupName) && <Text text="Secondary text" />}
                      </div>
                    )}
                    {state === "Selected" && [true, false].includes(groupName) && (
                      <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center min-h-px min-w-px relative" data-name="Leading">
                        <AvatarLightImage />
                        <OverlinePrimarySecondaryText text="Secondary text" />
                      </div>
                    )}
                  </div>
                </ListItemTemplate>
              </div>
            </div>
          </div>
        )}
        {state === "Hover" && [true, false].includes(groupName) && (
          <button className={`bg-[rgba(22,21,19,0.08)] cursor-pointer relative ${isHoverAndNotGroupName ? "flex-[1_0_0] h-[48px] min-h-px min-w-px" : "shrink-0 w-full"}`} data-name="List View - List Item Template">
            <div className="flex flex-row items-center size-full">
              <div className={`content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative ${isHoverAndNotGroupName ? "size-full" : "w-full"}`}>
                <ListItemTemplate>
                  <HelperbuttonImageAndText text="Secondary text" />
                </ListItemTemplate>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
type SingleSelectMenuItemCountProps = {
  className?: string;
  count?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";
  groupName?: boolean;
};

function SingleSelectMenuItemCount({ className, count = "5", groupName = false }: SingleSelectMenuItemCountProps) {
  const is10AndGroupName = count === "10" && groupName;
  const is10AndNotGroupName = count === "10" && !groupName;
  const is11AndGroupName = count === "11" && groupName;
  const is11AndNotGroupName = count === "11" && !groupName;
  const is12AndGroupName = count === "12" && groupName;
  const is12AndNotGroupName = count === "12" && !groupName;
  const is13AndGroupName = count === "13" && groupName;
  const is13AndNotGroupName = count === "13" && !groupName;
  const is14AndGroupName = count === "14" && groupName;
  const is14AndNotGroupName = count === "14" && !groupName;
  const is15AndGroupName = count === "15" && groupName;
  const is15AndNotGroupName = count === "15" && !groupName;
  const is3AndGroupName = count === "3" && groupName;
  const is3AndNotGroupName = count === "3" && !groupName;
  const is4AndGroupName = count === "4" && groupName;
  const is4AndNotGroupName = count === "4" && !groupName;
  const is5AndGroupName = count === "5" && groupName;
  const is5AndNotGroupName = count === "5" && !groupName;
  const is6AndGroupName = count === "6" && groupName;
  const is6AndNotGroupName = count === "6" && !groupName;
  const is7AndGroupName = count === "7" && groupName;
  const is7AndNotGroupName = count === "7" && !groupName;
  const is8AndGroupName = count === "8" && groupName;
  const is8AndNotGroupName = count === "8" && !groupName;
  const is9AndGroupName = count === "9" && groupName;
  const is9AndNotGroupName = count === "9" && !groupName;
  return (
    <div className={className || "relative w-[352px]"}>
      <div className="content-stretch flex flex-col items-start relative w-full">
        <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["5", "1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />
        {(is5AndNotGroupName || is5AndGroupName || (count === "2" && !groupName) || (count === "2" && groupName) || is3AndNotGroupName || is3AndGroupName || is4AndNotGroupName || is4AndGroupName || is6AndNotGroupName || is6AndGroupName || is7AndNotGroupName || is7AndGroupName || is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["5", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is5AndNotGroupName || is5AndGroupName || is3AndNotGroupName || is3AndGroupName || is4AndNotGroupName || is4AndGroupName || is6AndNotGroupName || is6AndGroupName || is7AndNotGroupName || is7AndGroupName || is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["5", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is5AndNotGroupName || is5AndGroupName || is4AndNotGroupName || is4AndGroupName || is6AndNotGroupName || is6AndGroupName || is7AndNotGroupName || is7AndGroupName || is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["5", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is5AndNotGroupName || is5AndGroupName || is6AndNotGroupName || is6AndGroupName || is7AndNotGroupName || is7AndGroupName || is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is6AndNotGroupName || is6AndGroupName || is7AndNotGroupName || is7AndGroupName || is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is7AndNotGroupName || is7AndGroupName || is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["7", "8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is8AndNotGroupName || is8AndGroupName || is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["8", "9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is9AndNotGroupName || is9AndGroupName || is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["9", "10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is10AndNotGroupName || is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is10AndGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["10", "11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is11AndNotGroupName || is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is11AndGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["11", "12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is12AndNotGroupName || is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is12AndGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["12", "13", "14", "15"].includes(count) ? true : undefined} />}
        {(is13AndNotGroupName || is14AndNotGroupName || is15AndNotGroupName || is13AndGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["13", "14", "15"].includes(count) ? true : undefined} />}
        {(is14AndNotGroupName || is15AndNotGroupName || is14AndGroupName || is15AndGroupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={groupName && ["14", "15"].includes(count) ? true : undefined} />}
        {count === "15" && [false, true].includes(groupName) && <SingleSelectMenuItem className="relative shrink-0 w-full" groupName={is15AndGroupName ? true : undefined} />}
      </div>
    </div>
  );
}
type SingleSelectMenuProps = {
  className?: string;
  assistiveText?: "No" | "Yes" | "Assistive text3" | "Assistive text4";
  scrollbar?: boolean;
  type?: "Default" | "Add to list";
};

function SingleSelectMenu({ className, assistiveText = "No", scrollbar = false, type = "Default" }: SingleSelectMenuProps) {
  const isAssistiveText3AndAddToList = assistiveText === "Assistive text3" && type === "Add to list";
  const isYesAndDefault = assistiveText === "Yes" && type === "Default";
  return (
    <div className={className || "bg-white relative rounded-[6px] shadow-[0px_6px_12px_0px_rgba(0,0,0,0.2)] w-[352px]"}>
      <div className="flex flex-col items-center size-full">
        <div className={`content-stretch flex flex-col items-center overflow-clip relative w-full ${isYesAndDefault || isAssistiveText3AndAddToList ? "pt-[8px]" : "py-[8px]"}`}>
          {type === "Default" && ["No", "Yes"].includes(assistiveText) && <SingleSelectMenuItemCount className="relative shrink-0 w-full" />}
          {type === "Add to list" && ["Assistive text4", "Assistive text3"].includes(assistiveText) && <AddToListMenuItem className="relative shrink-0 w-full" />}
          {((assistiveText === "No" && type === "Default") || (assistiveText === "Assistive text4" && type === "Add to list")) && scrollbar && <SingleSelectMenu21BVertical02Active />}
          {(isYesAndDefault || isAssistiveText3AndAddToList) && (
            <div className="bg-white relative rounded-bl-[6px] rounded-br-[6px] shrink-0 w-full" data-name="Assistive text in menu*">
              <div aria-hidden="true" className="absolute border-[rgba(22,21,19,0.12)] border-solid border-t inset-0 pointer-events-none rounded-bl-[6px] rounded-br-[6px]" />
              <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
                <p className="font-['Oracle_Sans:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[12px] text-[rgba(22,21,19,0.7)] w-full">
                  <span className="leading-[16px]">{`Assistive text to prevent user error. `}</span>
                  <span className="leading-[16px] text-[#00688c]">Learn more</span>
                </p>
              </div>
            </div>
          )}
          {(isYesAndDefault || isAssistiveText3AndAddToList) && scrollbar && <SingleSelectMenu21BVertical02Active />}
        </div>
      </div>
    </div>
  );
}

export default function SingleSelectMenu1() {
  return <SingleSelectMenu className="bg-white relative rounded-[6px] shadow-[0px_6px_12px_0px_rgba(0,0,0,0.2)] size-full" />;
}