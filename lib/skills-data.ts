export interface Skill {
  slug: string;
  title: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: string;
  description: string;

  // Detail page content
  whatIs: string;
  whenToUse: string;

  // Syntax
  syntax: string;
  syntaxExplanation: string[];

  // Example
  example: {
    scenario: string;
    data: string;
    formula: string;
    result: string;
  };

  // Tips & Errors
  tips: string[];
  commonErrors: string[];

  // Related
  relatedSkills: string[];

  // Optional
  videoUrl?: string;
}

export const skillsData: Skill[] = [
  {
    slug: "vlookup",
    title: "VLOOKUP",
    category: "formulas",
    difficulty: "intermediate",
    icon: "🔍",
    description:
      "Search for values in tables and retrieve matching information",

    whatIs:
      "VLOOKUP (Vertical Lookup) searches for a value in the first column of a table and returns a value from another column in the same row. It's like looking up a name in a phone book and finding the corresponding phone number.",

    whenToUse:
      "Use VLOOKUP when you need to merge data from two different tables. For example: adding product prices to orders, finding employee names from IDs, or retrieving customer addresses from a master file.",

    syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",

    syntaxExplanation: [
      "lookup_value: The value you're searching for (e.g., a product ID)",
      "table_array: The range where the search happens (e.g., A1:C100)",
      "col_index_num: Which column from the table to return (1, 2, 3...)",
      "range_lookup: FALSE for exact match, TRUE for approximate (almost always use FALSE)",
    ],

    example: {
      scenario:
        "You have a list of product IDs and want to add prices from a price list",
      data: "Column A: Product IDs (A001, A002, A003) | Price list in another sheet: Column A = IDs, Column B = Prices",
      formula: '=VLOOKUP(A2,PriceList!A:B,2,FALSE)',
      result: "Displays the price from column B of the price list",
    },

    tips: [
      "Always use FALSE as the last parameter for exact matches",
      "The lookup column must always be the first column in the search range",
      "Use $ for absolute references: $A$1:$B$100",
      "For #N/A errors: Check if the lookup value actually exists in the table",
      "For left lookups, use INDEX/MATCH instead of VLOOKUP",
    ],

    commonErrors: [
      "#N/A: The lookup value was not found - check for typos or extra spaces",
      "#REF!: The column index is greater than the number of columns in the table",
      "Wrong values: You used TRUE instead of FALSE and Excel returns approximate matches",
    ],

    relatedSkills: ["indexMatch", "sumif", "charts"],
  },

  {
    slug: "sumif",
    title: "SUMIF & SUMIFS",
    category: "formulas",
    difficulty: "beginner",
    icon: "➕",
    description: "Sum numbers that meet specific criteria",

    whatIs:
      "SUMIF adds only the numbers that meet a certain criterion. Instead of simply adding all values, you can filter: 'Add only sales from Germany' or 'Sum only values over $1000'.",

    whenToUse:
      "Use SUMIF for conditional sums: sales by region, costs by category, sales of a specific product. Whenever 'Sum all X where Y applies' makes sense.",

    syntax: "=SUMIF(range, criteria, [sum_range])",

    syntaxExplanation: [
      "range: The range that checks the condition (e.g., region column)",
      "criteria: The condition ('Germany', '>1000', 'A*')",
      "sum_range: Optional - which range to sum (if different from range)",
    ],

    example: {
      scenario: "Calculate total revenue from all sales in Germany",
      data: "Column A: Countries | Column B: Revenue",
      formula: '=SUMIF(A:A,"Germany",B:B)',
      result: "Sum of all revenue where country = Germany",
    },

    tips: [
      "For multiple conditions use SUMIFS (with S at the end)",
      "Wildcards work: 'A*' for anything starting with A",
      "Use cell references instead of fixed text: =SUMIF(A:A,D2,B:B)",
      'Comparison operators: ">100", "<=50", "<>0" (not equal to zero)',
    ],

    commonErrors: [
      "Forgetting to specify sum_range when it differs from criteria range",
      "Text criteria without quotes: Must be 'Germany', not Germany",
    ],

    relatedSkills: ["vlookup", "dataValidation", "pivotTables"],
  },

  {
    slug: "pivotTables",
    title: "Pivot Tables",
    category: "dataAnalysis",
    difficulty: "intermediate",
    icon: "📊",
    description: "Create dynamic summary tables to analyze data interactively",

    whatIs:
      "Pivot tables are interactive tools that quickly summarize, analyze, and present large datasets. They let you group, filter, and calculate data without writing formulas, making complex analysis accessible in minutes.",

    whenToUse:
      "Use pivot tables when you need to analyze large datasets: summarize sales by region and product, compare monthly performance, find patterns in customer behavior, or create executive dashboards.",

    syntax: "Insert > PivotTable (or Alt + N + V)",

    syntaxExplanation: [
      "Rows: Categories you want to group by (e.g., Products, Regions)",
      "Columns: Additional grouping dimension (e.g., Months, Years)",
      "Values: Numbers to calculate (Sum, Average, Count, etc.)",
      "Filters: Criteria to show/hide data",
    ],

    example: {
      scenario: "Analyze total sales by product category and month",
      data: "Source data with columns: Date, Category, Product, Sales Amount",
      formula: "No formula needed - drag fields to Rows, Columns, and Values areas",
      result: "Interactive table showing sales breakdown by category and time period",
    },

    tips: [
      "Always format source data as a Table (Ctrl + T) for automatic updates",
      "Use slicers for interactive filtering (Insert > Slicer)",
      "Group dates by month/quarter/year with right-click > Group",
      "Refresh pivot tables after source data changes (Alt + F5)",
      "Use calculated fields for custom calculations",
    ],

    commonErrors: [
      "Source data has blank rows/columns - clean your data first",
      "Not refreshing after data changes - pivot shows outdated information",
      "Mixing data types in columns (numbers and text) causes calculation errors",
    ],

    relatedSkills: ["powerQuery", "charts", "dataValidation"],
  },

  {
    slug: "conditionalFormatting",
    title: "Conditional Formatting",
    category: "formatting",
    difficulty: "beginner",
    icon: "🎨",
    description: "Apply formatting to cells based on their values",

    whatIs:
      "Conditional formatting automatically changes cell appearance (color, font, borders) based on cell values or formulas. It highlights important data, shows trends, and makes patterns visible at a glance.",

    whenToUse:
      "Use conditional formatting to visualize data: highlight top/bottom values, show progress with data bars, identify duplicates, color-code status indicators, or create heat maps for quick insights.",

    syntax: "Home > Conditional Formatting (or Alt + H + L)",

    syntaxExplanation: [
      "Highlight Cell Rules: Format cells that meet simple criteria (greater than, between, equal to)",
      "Top/Bottom Rules: Highlight top 10, above average, etc.",
      "Data Bars: Show values as horizontal bars inside cells",
      "Color Scales: Apply color gradients based on value magnitude",
      "Icon Sets: Display icons (arrows, flags, ratings) based on thresholds",
    ],

    example: {
      scenario: "Highlight sales above $10,000 in green and below $5,000 in red",
      data: "Column B contains sales figures from B2 to B100",
      formula: "Select B2:B100 > Conditional Formatting > Highlight Cell Rules > Greater Than > 10000 > Green Fill",
      result: "All cells with values above $10,000 appear with green background",
    },

    tips: [
      "Use custom formulas for complex conditions with 'Use a formula to determine...'",
      "Manage Rules (Alt + H + L + R) to edit or delete existing formatting",
      "Apply to entire rows using absolute column references: =$A1>100",
      "Layer multiple rules - order matters! (first match wins)",
      "Use 'Stop If True' to prevent rule conflicts",
    ],

    commonErrors: [
      "Formula references wrong cells - use $ correctly for absolute/relative",
      "Too many overlapping rules cause confusion - simplify!",
      "Copying cells doesn't copy conditional formatting by default - use Format Painter",
    ],

    relatedSkills: ["dataValidation", "charts", "vlookup"],
  },

  {
    slug: "indexMatch",
    title: "INDEX-MATCH",
    category: "formulas",
    difficulty: "advanced",
    icon: "🎯",
    description: "A more flexible alternative to VLOOKUP for any direction lookups",

    whatIs:
      "INDEX-MATCH combines two functions to create a powerful lookup formula. INDEX returns a value from a specific position, while MATCH finds the position of a value. Together, they're more flexible than VLOOKUP and can look left, right, up, or down.",

    whenToUse:
      "Use INDEX-MATCH when VLOOKUP falls short: looking up values to the left, when columns might be inserted/deleted, for better performance with large datasets, or for two-way lookups (intersection of row and column).",

    syntax: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",

    syntaxExplanation: [
      "INDEX(array, row_num): Returns value from array at position row_num",
      "MATCH(lookup_value, lookup_array, 0): Finds position of lookup_value in lookup_array",
      "Combined: MATCH finds position, INDEX returns value from that position",
      "0 in MATCH: Exact match (like FALSE in VLOOKUP)",
    ],

    example: {
      scenario: "Find employee salary where employee name is in column C and salary in column A",
      data: "Column A: Salaries | Column B: Departments | Column C: Employee Names",
      formula: '=INDEX(A:A, MATCH("John Doe", C:C, 0))',
      result: "Returns John Doe's salary from column A (left lookup!)",
    },

    tips: [
      "Two-way lookup: =INDEX(data, MATCH(row_val, row_range, 0), MATCH(col_val, col_range, 0))",
      "More efficient than VLOOKUP for large datasets",
      "Not affected by column insertions/deletions",
      "Use named ranges for better readability",
      "Combine with IFERROR to handle missing values gracefully",
    ],

    commonErrors: [
      "#N/A: Lookup value not found - check spelling and data types",
      "#REF!: Return range and lookup range have different sizes",
      "Wrong result: Using 1 or -1 instead of 0 in MATCH (approximate match)",
    ],

    relatedSkills: ["vlookup", "sumif", "powerQuery"],
  },

  {
    slug: "dataValidation",
    title: "Data Validation & Dropdowns",
    category: "dataManagement",
    difficulty: "beginner",
    icon: "✅",
    description: "Control what data can be entered into cells",

    whatIs:
      "Data validation restricts what users can enter into cells. Create dropdown lists, enforce number ranges, prevent invalid dates, or require specific text patterns. It maintains data quality and reduces errors.",

    whenToUse:
      "Use data validation for consistent data entry: dropdown lists for categories/statuses, date range restrictions for scheduling, number limits for budgets, or custom rules for part numbers and codes.",

    syntax: "Data > Data Validation (or Alt + A + V + V)",

    syntaxExplanation: [
      "List: Create dropdown from range or comma-separated values",
      "Number: Restrict to whole numbers, decimals, or ranges",
      "Date: Allow only dates within specific periods",
      "Text Length: Limit character count",
      "Custom: Use formulas for complex validation rules",
    ],

    example: {
      scenario: "Create a dropdown list for department selection",
      data: "Allowed values: Sales, Marketing, IT, HR, Finance",
      formula: 'Select cells > Data Validation > List > Source: "Sales,Marketing,IT,HR,Finance"',
      result: "Cells show dropdown arrow with only these five department options",
    },

    tips: [
      "Reference a range for dynamic lists: =Sheet2!$A$1:$A$10",
      "Use named ranges for cleaner formulas and easier maintenance",
      "Add input messages to guide users (Settings tab)",
      "Create error alerts to explain why invalid entries are rejected",
      "Dependent dropdowns: Use INDIRECT for cascading lists",
    ],

    commonErrors: [
      "Source range includes blank cells - dropdowns show empty options",
      "Not using absolute references ($) - validation breaks when copied",
      "Existing data doesn't match validation rules - highlight with Circle Invalid Data",
    ],

    relatedSkills: ["conditionalFormatting", "vlookup", "pivotTables"],
  },

  {
    slug: "macros",
    title: "Macros & VBA",
    category: "automation",
    difficulty: "advanced",
    icon: "🤖",
    description: "Automate repetitive tasks with recorded macros and VBA",

    whatIs:
      "Macros record your actions in Excel and replay them with one click. VBA (Visual Basic for Applications) is the programming language behind macros, letting you automate complex tasks, create custom functions, and build interactive tools.",

    whenToUse:
      "Use macros for repetitive tasks: formatting reports, processing multiple files, cleaning data, generating monthly summaries, or creating custom Excel tools. If you do it more than 3 times, automate it!",

    syntax: "Developer > Record Macro (Enable Developer tab: File > Options > Customize Ribbon)",

    syntaxExplanation: [
      "Record Macro: Captures your clicks and keystrokes as VBA code",
      "Macro name: Give it a clear, descriptive name (no spaces)",
      "Shortcut key: Optional keyboard shortcut (Ctrl + letter)",
      "Store in: This Workbook, New Workbook, or Personal Macro Workbook",
      "Stop Recording: Finishes recording and saves the macro",
    ],

    example: {
      scenario: "Automate formatting a weekly sales report",
      data: "Raw data exported from system needs consistent formatting",
      formula: "Record Macro > Apply headers, formatting, formulas > Stop Recording",
      result: "One-click macro button applies all formatting in seconds",
    },

    tips: [
      "Use relative references for flexible macros (Record Macro dialog)",
      "Add macros to Quick Access Toolbar for easy access",
      "Personal Macro Workbook makes macros available in all workbooks",
      "Test macros on copy of data first - they can't be undone!",
      "Learn basic VBA to edit and improve recorded macros",
    ],

    commonErrors: [
      "Recording unnecessary actions - plan before recording",
      "Hard-coded cell references make macros inflexible",
      "Macros disabled by security settings - adjust Trust Center settings",
      "Running macros without backup - always save first!",
    ],

    relatedSkills: ["powerQuery", "dataValidation", "pivotTables"],
  },

  {
    slug: "powerQuery",
    title: "Power Query",
    category: "dataAnalysis",
    difficulty: "advanced",
    icon: "⚡",
    description: "Connect to, combine, and refine data from multiple sources",

    whatIs:
      "Power Query is Excel's data transformation engine. It connects to various data sources (files, databases, web), cleans and shapes data with a visual interface, and refreshes automatically. No formulas needed - just click and transform.",

    whenToUse:
      "Use Power Query to import and clean data from multiple sources, combine files from folders, remove duplicates and errors, reshape data structures, create automated data pipelines, or build refreshable reports.",

    syntax: "Data > Get Data or Data > From Table/Range (Ctrl + T then Data > From Table/Range)",

    syntaxExplanation: [
      "Get Data: Connect to external sources (files, databases, web pages)",
      "Transform: Clean, filter, merge, append, pivot/unpivot data",
      "Close & Load: Save transformed data to Excel worksheet or data model",
      "Refresh: Update queries with new/changed source data (Alt + F5)",
      "M Language: Behind-the-scenes code (auto-generated, editable)",
    ],

    example: {
      scenario: "Combine all Excel files from a folder into one table",
      data: "Monthly sales files (Jan.xlsx, Feb.xlsx, etc.) in same folder",
      formula: "Get Data > From File > From Folder > Select folder > Combine & Transform",
      result: "Single table with data from all files, updates automatically when new files added",
    },

    tips: [
      "Applied Steps show transformation history - edit or delete steps anytime",
      "Use 'Keep' or 'Remove' columns to reduce data size and improve performance",
      "Merge queries = VLOOKUP-like joins between tables",
      "Append queries = stack tables on top of each other",
      "Group By for aggregations (like pivot tables but in Power Query)",
    ],

    commonErrors: [
      "File path changes break queries - use relative paths when possible",
      "Not refreshing queries after source data changes",
      "Loading too much data slows Excel - filter early in the process",
      "Privacy levels cause errors when combining sources - adjust in settings",
    ],

    relatedSkills: ["pivotTables", "macros", "dataValidation"],
  },

  {
    slug: "charts",
    title: "Charts & Graphs",
    category: "visualization",
    difficulty: "beginner",
    icon: "📈",
    description: "Visualize your data with various chart types for better insights",

    whatIs:
      "Charts transform numbers into visual stories. Excel offers column, bar, line, pie, scatter, and many other chart types. Good charts highlight trends, compare values, and make data insights obvious to any audience.",

    whenToUse:
      "Use charts to communicate data: show sales trends over time, compare performance across teams, display composition of expenses, illustrate correlations, or create executive dashboards. When numbers alone aren't enough.",

    syntax: "Select data > Insert > Chart Type (or Alt + F1 for default chart)",

    syntaxExplanation: [
      "Column/Bar: Compare values across categories",
      "Line: Show trends over time",
      "Pie: Display parts of a whole (use sparingly!)",
      "Scatter: Show relationship between two variables",
      "Combo: Combine different chart types (e.g., column + line)",
    ],

    example: {
      scenario: "Create a line chart showing monthly sales trend",
      data: "Column A: Months (Jan-Dec) | Column B: Sales figures",
      formula: "Select A1:B13 > Insert > Line Chart > Choose style",
      result: "Visual trend line showing sales performance across the year",
    },

    tips: [
      "Start with data in table format (Ctrl + T) for dynamic charts",
      "Remove chart junk: gridlines, 3D effects, unnecessary legends",
      "Label data points directly instead of using legends",
      "Use consistent colors for same categories across multiple charts",
      "Choose chart type wisely - line for trends, column for comparisons",
    ],

    commonErrors: [
      "Using pie charts with too many slices - use bar chart instead",
      "3D effects look fancy but distort data perception",
      "Not starting Y-axis at zero can be misleading",
      "Too many colors or effects make charts hard to read",
    ],

    relatedSkills: ["pivotTables", "conditionalFormatting", "powerQuery"],
  },
];

// Helper function to get skill by slug
export function getSkillBySlug(slug: string): Skill | undefined {
  return skillsData.find((skill) => skill.slug === slug);
}

// Helper function to get all skills
export function getAllSkills(): Skill[] {
  return skillsData;
}

// Helper function to get related skills
export function getRelatedSkills(skill: Skill): Skill[] {
  return skill.relatedSkills
    .map((slug) => getSkillBySlug(slug))
    .filter((s): s is Skill => s !== undefined);
}
