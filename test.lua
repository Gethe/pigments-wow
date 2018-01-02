--[[ Decimal Colors ]]--

-- color object methods
local color = _G.CreateColor(0, 0, 1, 1)
color:SetRGB(1, 0, 0)
color:SetRGBA(1, 0, 0, 0.5)

-- frame methods
local frame = _G.CreateFrame("Frame")
frame:SetBackdropColor(0, 0, 0)
frame:SetBackdropColor(0, 0, 0, 0.5)

frame:SetBackdropBorderColor(0, 1, 0)
frame:SetBackdropBorderColor(0, 1, 0, 0.5)

-- texture methods
local texture = frame:CreateTexture()
texture:SetColorTexture(1, 0.5, 0)
texture:SetColorTexture(1, 0.5, 0, .5)

texture:SetVertexColor(0.5, 1, 0)
texture:SetVertexColor(0.5, 1, 0, 0.5)

texture:SetGradient("VERTICAL", 0, 0, 0, 1, 1, 1)
texture:SetGradient("VERTICAL", 1, 1, 1, 0, 0, 0)

-- font methods
local fontStr = frame:CreateFontString()
fontStr:SetTextColor(1, 1, 0)
fontStr:SetTextColor(1, 1, 0, 0.5)


--[[ HEX Colors ]]--

-- color string
local colorStr, notInt = "ffabd473", 12345678
fontStr:SetFormattedText("This is |cffabcdefColored text|r!!! %d", notInt)
fontStr:SetFormattedText("This is |c77abcdefsome |cfffedcbamore |c%scolored text|r", colorStr)
