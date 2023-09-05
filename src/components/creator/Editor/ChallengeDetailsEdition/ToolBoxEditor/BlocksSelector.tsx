import { Box, Switch, FormControlLabel, Typography, Stack } from "@mui/material"
import { useTranslation } from "react-i18next"
import { BlockType, categories } from "../../../../blocks"
import { ToolboxState } from "./ToolBoxEditor"

type BlocksSelectorProps = {
	toolboxState: ToolboxState
	availableBlocks: BlockType[]
	setToolBoxItems: (blocks: string[]) => void
	toolBoxItems: string[]
}

export const BlocksSelector = ({toolboxState, setToolBoxItems, availableBlocks, toolBoxItems}: BlocksSelectorProps) => {
	return (
		<>
			<Box style={{ justifyContent: "center" }}>
				{categories.map((categoryName) => {
					return (
						<div key={categoryName}>
							<CategoryToggle
								checked={toolboxState.isCategorySelected(categoryName)}
								toolboxState={toolboxState}
								categoryName={categoryName}
								setToolBoxItems={setToolBoxItems}
							/>
							{availableBlocks.map((block: any) => {
								return (
									categoryName === block.categoryId.toLowerCase() && (
										<div key={block.id} style={{ paddingLeft: "20px" }}>
											<BlockToggle
												block={block}
												toolboxState={toolboxState}
												setToolBoxItems={setToolBoxItems}
												checked={toolBoxItems.includes(block.id)}
											/>
											<br />
										</div>
									)
								)
							})}
						</div>
					)
				})}
			</Box>
		</>
	)
}

type CategoryToggleProps = {
	categoryName: string
	checked: boolean
	setToolBoxItems: (algo: any) => void
	toolboxState: ToolboxState
}

const CategoryToggle = ({categoryName, checked, setToolBoxItems, toolboxState}: CategoryToggleProps) => {
	const { t } = useTranslation("blocks")

	const handleCategoryToggle = (event: { target: { name: string; checked: boolean } }) => {
		toolboxState.categoryChanged(event.target.name, event.target.checked)
		setToolBoxItems(toolboxState.selectedBlockIds())
	}

	return (
		<>
			<FormControlLabel
				key={categoryName}
				control={
					<Switch
						checked={checked}
						color="secondary"
						name={categoryName}
						key={categoryName}
						onChange={handleCategoryToggle}
					/>
				}
				label={<Typography variant="h6">{t("categories." + categoryName)}</Typography>}
			/>
		</>
	)
}

type BlockToggleProps = {
	block: any
	checked: boolean
	setToolBoxItems: (algo: any) => void
	toolboxState: ToolboxState
}

const BlockToggle = ({ block, checked, setToolBoxItems, toolboxState }: BlockToggleProps) => {
	const { t } = useTranslation("blocks")

	const handleBlockToggle = (event: { target: { name: string; checked: boolean } }) => {
		toolboxState.blockChanged(event.target.name, event.target.checked)
		setToolBoxItems(toolboxState.selectedBlockIds())
	}

	return (
		<>
			<FormControlLabel
				key={block.id}
				control={
					<Switch
						checked={checked}
						color="secondary"
						name={block.id}
						key={block.id}
						onChange={handleBlockToggle}
					/>
				}
				label={t("blocks." + block.intlId)}
			/>
		</>
	)
}

type CategorizedToggleProps = {
	toolboxState: ToolboxState
	isCategorized: boolean
	setIsCategorized: (categorized: boolean) => void
}

export const CategorizedToggle = ({toolboxState, isCategorized, setIsCategorized}: CategorizedToggleProps) => {
	const { t } = useTranslation("blocks")

	const handleIsCategorizedOnChange = (event: { target: { checked: boolean } }) => {
		setIsCategorized(event.target.checked)
	}

	return (
		<>
			<Stack alignItems="flex-end">
				<FormControlLabel
					key="isCategorized"
					labelPlacement="start"
					disabled={toolboxState.categorizationShouldBeForced()}
					control={
						<Switch
							color="secondary"
							checked={isCategorized || toolboxState.categorizationShouldBeForced()}
							key="isCategorized"
							onChange={handleIsCategorizedOnChange}
						/>
					}
					label={t("categories.categorized")}
				/>
				<Typography width="60%" textAlign="right" lineHeight="1.2" variant="caption">
					{t("toolbox.categoriesHint")}
				</Typography>
			</Stack>
		</>
	)
}
