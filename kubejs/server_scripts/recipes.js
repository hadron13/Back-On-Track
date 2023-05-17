// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

var seed
var log = []

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let AE2 = (id, x) => MOD("ae2", id, x)
let TE = (id, x) => MOD("thermal", id, x)
let AP = (id, x) => MOD("architects_palette", id, x)
let CR = (id, x) => MOD("create", id, x)
let TC = (id, x) => MOD("tconstruct", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let FD = (id, x) => MOD("farmersdelight", id, x)
let BOP = (id, x) => MOD("biomesoplenty", id, x)
let SD = (id, x) => MOD("storagedrawers", id, x) 
let SP = (id, x) => MOD("supplementaries", id, x)
let F = (id, x) => MOD("forge", id, x)
let AC = (id, x) => MOD("aquaculture", id, x)
let PP = (id, x) => MOD("prettypipes", id, x)
let OC = (id, x) => MOD("occultism", id, x)
let BC = (id, x) => MOD("createbigcannons", id, x)
//

let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']
let native_metals = ['iron', 'zinc', 'lead', 'copper', 'nickel', 'gold']
let wood_types = [MC('oak'), MC('spruce'), MC('birch'), MC('jungle'), MC('acacia'), MC('dark_oak'), MC('crimson'), MC('warped'), BOP('fir'), BOP('redwood'), BOP('cherry'), BOP('mahogany'), BOP('jacaranda'), BOP('palm'), BOP('willow'), BOP('dead'), BOP('magic'), BOP('umbran'), BOP('hellbark'), AP('twisted')]

let donutCraft = (event, output, center, ring) => {
	event.shaped(output, [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: center,
		S: ring
	})
}

function ifiniDeploying(output, input, tool) {
	return {
		"type": "create:deploying",
		"ingredients": [
			Ingredient.of(input).toJson(),
			Ingredient.of(tool).toJson()
		],
		"results": [
			Item.of(output).toResultJson()
		],
		"keepHeldItem": true
	}
}

onEvent('recipes', event => {
	log.push('Registering Recipes')
	beforeNuke(event)
	unwantedRecipes(event)
	tweaks(event)
	unify(event)
	trickierWindmills(event)
	rubberMatters(event)
	prettierpipes(event)
	dioriticAndesite(event)
	oreProcessing(event)
	alloys(event)
	electronTube(event)

	andesiteMachine(event)
	copperMachine(event)
	brassMachine(event)
	trainMachine(event)
	zincMachine(event)
	explosiveMachine(event)
	invarMachine(event)
	enderMachine(event)
	fluixMachine(event)

	circuits(event)
	//madMaths(event)
	// alchemy(event)
	barrels(event)
	rocketScience(event)
	drawersop(event)
	trading(event)
	glitch(event)
	log.push('Recipes Updated')
})
onEvent('block.tags', event => {

	event.add('forge:ores', 'ae2:sky_stone_block')

})
onEvent('item.tags', event => {

	colours.forEach(element => {
		event.get(F('glazed_terracotta')).add(MC(`${element}_glazed_terracotta`))
	});

	global.trades.forEach(element => {
		event.get('forge:trade_cards').add(`kubejs:trade_card_${element}`)
		event.get('thermal:crafting/dies').add(`kubejs:trade_card_${element}`)
	});
	
	global.professions.forEach(element => {
		event.get('forge:profession_cards').add(`kubejs:profession_card_${element}`)
		event.get('thermal:crafting/dies').add(`kubejs:profession_card_${element}`)
	});

	event.get("farmersdelight:offhand_equipment").add("forbidden_arcanus:obsidian_skull_shield")

	// event.get("forge:raw_chicken").add("exoticbirds:raw_birdmeat")
	event.get("forge:tools/axes").add(TC("hand_axe"))
	event.get("forge:vines").add(MC("vine")).add(BOP("willow_vine")).add(BOP("spanish_moss"))

	event.get("forge:circuit_press")
		.add(AE2("name_press"))
		.add(AE2("silicon_press"))
		.add(AE2("logic_processor_press"))
		.add(AE2("engineering_processor_press"))
		.add(AE2("calculation_processor_press"))

	event.get("forbidden_arcanus:indestructible_blacklisted")
		
		// .add(/advancedrocketry:.*/)
		// .add(/xreliquary:.*/)
		.add(/waterstrainer:.*/)
		.add(OC("#miners/ores"))

	event.get("minecraft:planks").add("forbidden_arcanus:mysterywood_planks").add("forbidden_arcanus:cherrywood_planks")
	event.get("minecraft:logs_that_burn").add("#forbidden_arcanus:mysterywood_logs").add("#forbidden_arcanus:cherrywood_logs")

	event.get('forge:saws').add(KJ('stone_saw')).add(KJ('iron_saw')).add(KJ('diamond_saw'))
	event.get('forge:screwdrivers').add(KJ('screwdriver'))
	// event.get('forge:chromatic_resonators').add(KJ('chromatic_resonator'))
	// event.get('forge:flash_drives').add(KJ('flash_drive'))
	// event.get('forge:ender_staffs').add(RQ('ender_staff'))
	// event.get('forge:cross_of_mercys').add(RQ('mercy_cross'))
	event.get('forge:super_glues').add(CR('super_glue'))
	event.get('forge:wrenches').add(CR('wrench'))
	event.get('forge:tools/wrench').add(CR('wrench'))
	event.get('forge:soldering_irons').add(KJ('soldering_iron'))
	event.get('forge:ingots/steel').add("alloyed:steel_ingot")
	event.get('forge:storage_blocks/steel').add("alloyed:steel_block")

	event.get('ae2:all_certus_quartz').add(KJ('purified_certus_quartz_crystal'))

	event.get('ae2:all_fluix').add(KJ('purified_fluix_crystal'))


	// event.get('thermal:crafting/casts').add(KJ("three_cast")).add(KJ("eight_cast")).add(KJ("plus_cast")).add(KJ("minus_cast")).add(KJ("multiply_cast")).add(KJ("divide_cast")).add(F("#circuit_press"))

	event.get('create:upright_on_belt')
		.add(AE2("red_paint_ball"))
		.add(AE2("yellow_paint_ball"))
		.add(AE2("green_paint_ball"))
		.add(AE2("blue_paint_ball"))
		.add(AE2("magenta_paint_ball"))
		.add(AE2("black_paint_ball"))

	event.get('tconstruct:anvil_metal').add(CR('zinc_block'))

	let remove_metal =(ingot, block, nugget, type)=>{
		event.remove('forge:ingots/' + type, ingot)
		event.remove('forge:ingots', ingot)
		event.remove('balm:ingots', ingot)

		event.remove('forge:storage_blocks/' + type, block)
		event.remove('forge:storage_blocks', block)
		
	}

	remove_metal(TE('steel_ingot'), TE('steel_block'), TE('steel_nugget'), 'steel')
	remove_metal('davebuildingmod:steel_ingot', 'davebuildingmod:steel_block', '', 'steel')
	remove_metal('beyond_earth:steel_ingot', 'beyond_earth:steel_block', 'beyond_earth:steel_nugget', 'steel')

})

onEvent('fluid.tags', event => {

	event.add('beyond_earth:vehicle_fuel', 'thermal:refined_fuel')
	event.remove('beyond_earth:vehicle_fuel', 'beyond_earth:fuel')
	//agora reconhece como combustviel

	


})

// Scripts

function beforeNuke(event) {
	event.replaceInput({ id: "occultism:ritual/summon_foliot_crusher" }, F("#raw_materials/silver"), CR("raw_zinc"))
	event.replaceInput({ id: "occultism:ritual/summon_djinni_crusher" }, F("#raw_materials/silver"), CR("raw_zinc"))
}

function unwantedRecipes(event) {

	event.remove({ output: '#forge:coins' })
	event.remove({ output: AE2('grindstone') })
	event.remove({ output: TE('tin_block') })
	event.remove({ output: AE2('vibration_chamber') })
	event.remove({ output: AE2('inscriber') })
	event.remove({ output: AE2('quartz_glass') })
	event.remove({ output: AE2('silicon') })
	event.remove({ output: CR('chromatic_compound') })
	event.remove({ input: '#forge:coins' })
	event.remove({ input: '#forge:ores/redstone' })
	event.remove({ input: '#create:crushed_ores' })
	event.remove({ input: '#forge:ores/tin' })
	event.remove({ input: '#forge:ores/silver' })
	event.remove({ output: '#forge:plates/tin' })
	event.remove({ output: '#forge:plates/silver' })
	event.remove({ output: '#forge:gears/tin' })
	event.remove({ output: '#forge:gears/silver' })
	event.remove({ output: TE('steel_plate') })
	event.remove({ output: TE('steel_ingot') })
	event.remove({ output: TE('steel_block') })
	event.remove({ type: AE2('grinder') })
	event.remove({ type: TE('press') })
	event.remove({ id: /thermal:earth_charge\/.*/ })
	event.remove({ id: /thermal:machine\/smelter\/.*dust/ })
	event.remove({ id: /tconstruct:smeltery\/.*\/ore/ })
	event.remove({ id: "tconstruct:smeltery/entity_melting/ender" })
	event.remove({ id: "tconstruct:tables/tinkers_forge" })
	event.remove({ id: "tconstruct:tables/scorched_forge" })
	event.remove({ id: /tconstruct:smeltery\/melting\/ender\/.*/ })
	event.remove({ id: /tconstruct:smeltery\/casting\/ender\/.*/ })
	event.remove({ id: /tconstruct:smeltery\/.*\/tin.*/ })
	event.remove({ id: /ae2:tools\/paintballs.*/ })
	event.remove({ id: "grapplemod:repeller" })
	event.remove({ id: "grapplemod:forcefieldupgradeitem" })
	event.remove({ id: "grapplemod:rocketupgradeitem" })
	event.remove({ id: "grapplemod:rocketdoublemotorhook" })
	event.remove({ id: "grapplemod:magnethook" })
	event.remove({ id: "grapplemod:rockethook" })
	event.remove({ id: "forbidden_arcanus:eternal_stella" })
	event.remove({ id: OC('miner/ores/redstone_ore') })
	event.remove({ id: OC('miner/ores/aluminum_ore') })
	event.remove({ id: OC('miner/ores/tin_ore') })
	event.remove({ id: OC('miner/ores/silver_ore') })
	event.remove({ id: MC('diorite') })
	event.remove({ id: MC('andesite') })
	event.remove({ id: MC('granite') })
	event.remove({ id: CR('mixing/brass_ingot') })
	event.remove({ id: 'thermal:compat/biomesoplenty/tree_extractor_bop_pink_cherry' })
	event.remove({ id: 'thermal:compat/biomesoplenty/tree_extractor_bop_white_cherry' })
	event.remove({ id: 'thermal:compat/biomesoplenty/tree_extractor_bop_fir' })
	event.remove({ id: TC('smeltery/melting/metal/gold/enchanted_apple') })
	event.remove({ id: CR('cutting/andesite_alloy') })
	event.remove({ id: TE('storage/beetroot_block') })
	event.remove({ id: TE('storage/potato_block') })
	event.remove({ id: AE2('misc/grindstone_woodengear') })
	event.remove({ id: AE2('tools/misctools_entropy_manipulator') })
	event.remove({ id: TE('storage/carrot_block') })
	event.remove({ id: TE('fire_charge/invar_ingot_3') })
	event.remove({ id: TE('fire_charge/enderium_ingot_2') })
	event.remove({ id: TE('fire_charge/constantan_ingot_2') })
	event.remove({ id: TE('fire_charge/bronze_ingot_4') })
	event.remove({ id: TE('fire_charge/electrum_ingot_2') })
	event.remove({ id: TE('fire_charge/lumium_ingot_4') })
	event.remove({ id: TE('fire_charge/signalum_ingot_4') })
	event.remove({ id: TE('machine/pulverizer/pulverizer_cinnabar') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_signalum') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_lumium') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_electrum') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_enderium') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_invar') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_constantan') })
	event.remove({ id: TE('machine/smelter/smelter_alloy_bronze') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_brass') })
	event.remove({ id: TE('compat/tconstruct/smelter_alloy_tconstruct_rose_gold_ingot') })
	event.remove({ id: TE('machine/pulverizer/pulverizer_ender_pearl') })
	event.remove({ id: TE('storage/electrum_block') })
	event.remove({ id: TE('storage/electrum_nugget_from_ingot') })
	event.remove({ id: TE('machine/pulverizer/pulverizer_electrum_ingot_to_dust') })
	event.remove({ id: TE('parts/electrum_gear') })
	event.remove({ id: AP('smelting/charcoal_block_from_logs_that_burn_smoking') })
	event.remove({ id: 'portality:generator' })
	event.remove({ mod: 'pipez' })
    event.remove({ id: TC('smeltery/melting/metals/gold/dust')}) 
    event.remove({ id: TC('smeltery/melting/metals/zinc/dust')}) 
    event.remove({ id: TC('smeltery/melting/metals/iron/dust')}) 
    event.remove({ id: TC('smeltery/melting/metals/iron/dust')}) 
	event.remove({ input: TE('signalum_dust'), output: TE('signalum_ingot') })
	event.remove({ output: TE('signalum_dust'), input: TE('signalum_ingot') })
	event.remove({ output: TE('lightning_charge') })
	event.remove({ output: TE('ice_charge') })
	event.remove({ output: TE('earth_charge') })
	event.remove({ input: TE('lightning_charge') })
	event.remove({ input: TE('ice_charge') })
	event.remove({ input: TE('earth_charge') })
	event.remove({ input: "forbidden_arcanus:edelwood_bucket" })
	event.remove({ output: "forbidden_arcanus:edelwood_bucket" })
	event.remove({ mod: 'beyond_earth', type: 'minecraft:crafting_shaped'})
	// event.remove({ mod: 'beyond_earth', type: 'minecraft:stonecutting'})
	// event.remove({ mod: 'beyond_earth', type: 'minecraft:smelting'})
	event.remove({ mod: 'beyond_earth', type: 'minecraft:blasting'})
	event.remove({ mod: 'beyond_earth', type: 'beyond_earth:nasa_workbench'})
	event.remove({ mod: 'beyond_earth', type: 'beyond_earth:compressor'})
	event.remove({ mod: 'beyond_earth', type: 'beyond_earth:coal_generator'})
	event.remove({ mod: 'beyond_earth', type: 'beyond_earth:nasa_workbench'})
	event.remove({ mod: 'trashcans' })


	native_metals.forEach(e => {
		event.remove({ type: MC("smelting"), input: F("#dusts/" + e) })
		event.remove({ type: MC("blasting"), input: F("#dusts/" + e) })
		event.remove({ type: TC("melting"), input: F("#dusts/" + e) })
        event.remove({ id: TC('smeltery/melting/metals/' + e +'/dust')}) 
	})

}

function tweaks(event) {

	event.remove({ mod:'toms_storage'})
	event.remove({ id: 'waterstrainer:string_mesh' })
	event.remove({ id: 'waterstrainer:iron_mesh' })
	event.remove({ id: 'waterstrainer:obsidian_mesh' })
	event.remove({ id: 'waterstrainer:strainer_survivalist' })
	event.remove({ id: 'waterstrainer:strainer_survivalist_solid' })
	event.remove({ id: 'waterstrainer:strainer_survivalist_reinforced' })
	event.remove({ id: 'waterstrainer:strainer_fisherman' })
	event.remove({ id: 'waterstrainer:strainer_fisherman_solid' })
	event.remove({ id: 'waterstrainer:strainer_fisherman_reinforced' })

	event.remove({ id: TE("augments/item_filter_augment") })
	event.shapeless(TE("item_filter_augment"), [CR("filter"), TE("lapis_gear")])

	event.stonecutting(AE2("silicon_press"), KJ("circuit_scrap"))
	event.stonecutting(AE2("engineering_processor_press"), KJ("circuit_scrap"))
	event.stonecutting(AE2("calculation_processor_press"), KJ("circuit_scrap"))
	event.stonecutting(AE2("logic_processor_press"), KJ("circuit_scrap"))
	event.shaped(KJ("circuit_scrap", 2),
		[" A ", "ABA", " A "], { A: TE("invar_ingot"), B: F("#circuit_press") })

	event.remove({ id: FD("flint_knife") })
	event.remove({ id: FD("iron_knife") })
	event.remove({ id: FD("golden_knife") })
	event.remove({ id: FD("diamond_knife") })
	// event.remove({ id: "buddycards:fd/buddysteel_food_knife" })
	event.shaped(FD('flint_knife'), ['S ', ' M'], { M: MC("flint"), S: F('#rods/wooden') })
	event.shaped(FD('iron_knife'), ['S ', ' M'], { M: MC("iron_ingot"), S: F('#rods/wooden') })
	event.shaped(FD('golden_knife'), ['S ', ' M'], { M: MC("gold_ingot"), S: F('#rods/wooden') })
	event.shaped(FD('diamond_knife'), ['S ', ' M'], { M: MC("diamond"), S: F('#rods/wooden') })
	// event.shaped("buddycards:buddysteel_food_knife", ['S ', ' M'], { M: "buddycards:buddysteel_ingot", S: F('#rods/wooden') })

	event.remove({ id: "decorative_blocks:lattice" })
	event.shaped("decorative_blocks:lattice", [
		'SS',
		'SS'
	], {
		S: F("#rods/wooden")
	})

	event.shaped("trashcans:item_trash_can", [
		'SSS',
		'AEA',
		'AAA'
	], {
		S: CR('iron_sheet'),
		A: CR('andesite_alloy'),
		E: MC('ender_pearl')
	})

	event.shaped(BC('traffic_cone'), [
			' S ',
			' S ',
			'SCS'
		], {
		C: MC('orange_dye'),
		S: KJ('plastic')
	})

	event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("sand")).withChance(0.25)], TE("oil_sand"))
	event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("red_sand")).withChance(0.25)], TE("oil_red_sand"))

	// event.remove({ id: "forbidden_arcanus:iron_chain" }) // vanilla recipe conflict. what a world we live in
	// event.shapeless(Item.of("forbidden_arcanus:iron_chain", 3), "minecraft:chain")

	event.remove({ id: "computercraft:turtle_advanced" })
	event.remove({ id: "computercraft:turtle_advanced_upgrade" })
	event.remove({ id: "computercraft:turtle_normal" })

	event.smithing("computercraft:turtle_normal", "computercraft:computer_normal", TE("invar_gear"))
	event.smithing("computercraft:turtle_advanced", "computercraft:computer_advanced", TE("invar_gear"))
	event.recipes.createMechanicalCrafting("computercraft:turtle_normal", "AB", { A: "computercraft:computer_normal", B: TE("invar_gear") })
	event.recipes.createMechanicalCrafting("computercraft:turtle_advanced", "AB", { A: "computercraft:computer_advanced", B: TE("invar_gear") })

	event.shaped("computercraft:turtle_advanced", [
		'SSS',
		'SMS',
		'S S'
	], {
		M: "computercraft:turtle_normal",
		S: MC('gold_ingot')
	})

	event.recipes.createMechanicalCrafting("forbidden_arcanus:eternal_stella", [
		'PEEEP',
		'EDS E',
		'ESDSE',
		'E SDE',
		'PEEEP'
	], {
		E: "forbidden_arcanus:xpetrified_orb",
		D: "minecraft:diamond",
		S: "forbidden_arcanus:stellarite_piece",
		P: "createbigcannons:nethersteel_ingot"
	})

	donutCraft(event, MC("weeping_vines"), "forbidden_arcanus:rune", MC("twisting_vines"))
	donutCraft(event, MC("twisting_vines"), "forbidden_arcanus:rune", MC("weeping_vines"))

	event.shaped(AE2('entropy_manipulator'), [
		'S  ',
		' M ',
		'  M'
	], {
		M: TE("lead_plate"),
		S: AE2('#all_fluix')
	})

	event.shaped('waterstrainer:strainer_survivalist', [
		'SSS',
		'MMM',
		'SSS'
	], {
		M: 'createdeco:andesite_mesh_fence',
		S: 'minecraft:stick'
	})

	event.shaped('waterstrainer:strainer_fisherman', [
		'SSS',
		'MMM',
		'SSS'
	], {
		M: FD('canvas'),
		S: MC('bamboo')
	})

	event.shaped('waterstrainer:strainer_fisherman_reinforced', [
		'SSS',
		'MAM',
		'SSS'
	], {
		A: AC('neptunium_ingot'),
		M: FD('canvas'),
		S: MC('bamboo')
	})

	event.remove({ output: TC('obsidian_pane') })
	event.shaped(TC('obsidian_pane', 8), [
		'SSS',
		'SSS'
	], {
		S: MC('obsidian')
	})

	event.replaceInput({ id: "architects_palette:wither_lamp" }, AP('withered_bone'), TC('necrotic_bone'))
	event.replaceInput({ id: "architects_palette:withered_bone_block" }, AP('withered_bone'), TC('necrotic_bone'))
	event.remove({ id: "architects_palette:withered_bone" })

	event.remove({ id: "forbidden_arcanus:edelwood_stick" })
	event.shaped("3x forbidden_arcanus:edelwood_stick", [
		'S',
		'A',
		'S'
	], {
		S: 'forbidden_arcanus:edelwood_planks',
		A: MC('stick')
	})

	// event.replaceInput({ id: "computercraft:cable" }, MC('redstone'), PR_C('red_ingot'))
	// event.replaceInput({ id: "computercraft:wired_modem" }, MC('redstone'), PR_C('red_ingot'))
	event.replaceInput({ id: CR('crafting/kinetics/rope_pulley') }, '#forge:wool', '#supplementaries:ropes')
	event.replaceInput({ output: CR('adjustable_chain_gearshift') }, CR('electron_tube'), MC('redstone'))

	let tweak_casing = (r, i1, i2) => {
		event.remove({ output: r })
		event.smithing(r, i2, i1)
		event.recipes.createMechanicalCrafting(r, "AB", { A: i1, B: i2 })
	}


	tweak_casing(CR('andesite_casing'), CR('andesite_alloy'), '#minecraft:logs')
	tweak_casing(CR('copper_casing'), CR('copper_sheet'), '#minecraft:logs')
	tweak_casing(CR('brass_casing'), CR('brass_sheet'), '#minecraft:logs')
	tweak_casing(KJ('zinc_casing'), 'createdeco:zinc_sheet', 'minecraft:stone')
	tweak_casing(CR('railway_casing'), CR('sturdy_sheet'), CR('brass_casing'))
	tweak_casing(KJ('invar_casing'), TE('invar_ingot'), 'minecraft:stone')
	tweak_casing(KJ('fluix_casing'), TE('lead_plate'), 'minecraft:basalt')
	// tweak_casing('enderium', [MC('ender_pearl'), 'minecraft:obsidian'], KJ)

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:circuit_press" },
		"result": {
			"fluid": "tconstruct:molten_invar",
			"amount": 180
		},
		"temperature": 500,
		"time": 90
	})

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:recycling" },
		"result": {
			"fluid": "tconstruct:molten_iron",
			"amount": 30
		},
		"temperature": 500,
		"time": 40
	})



	event.remove({ output: TE("side_config_augment") })
	event.shaped(TE("side_config_augment"), [
		' S ',
		'PMP',
		' S '
	], {
		P: TE("invar_ingot"),
		M: TE("redstone_servo"),
		S: TE("gold_gear")
	})

	let bedrock_cobblegen = (adjacent, output) => {
		event.custom({
			"type": "thermal:rock_gen",
			"adjacent": adjacent,
			"below": "minecraft:bedrock",
			"result": { "item": output }
		})
	}

	bedrock_cobblegen(MC("packed_ice"), MC("andesite"))
	bedrock_cobblegen(AP("polished_packed_ice"), MC("granite"))
	bedrock_cobblegen(AP("chiseled_packed_ice"), MC("diorite"))
	// bedrock_cobblegen(AP("packed_ice_pillar"), CR("gabbro_cobblestone"))

	// event.recipes.createPressing([KJ('zinc_sheet')], CR('zinc_ingot'))
	event.recipes.createPressing([TE('nickel_plate')], TE('nickel_ingot'))

	// event.remove({ id: "chisel:charcoal/raw" })
	event.remove({ id: AP("charcoal_block") })
	// event.stonecutting("chisel:charcoal/raw", MC('charcoal'))
	event.stonecutting(AP("charcoal_block"), MC('charcoal'))

	event.remove({ id: CR('splashing/gravel') })
	event.recipes.createSplashing([
		Item.of(MC('iron_nugget', 2)).withChance(0.125),
		Item.of(MC('flint')).withChance(0.25)
	], 'minecraft:gravel')

	event.remove({ id: CR('splashing/red_sand') })
	event.recipes.createSplashing([
		Item.of(MC('gold_nugget', 2)).withChance(0.125),
		Item.of(MC('dead_bush')).withChance(0.05)
	], 'minecraft:red_sand')

	event.recipes.createCrushing([Item.of(AC('neptunium_ingot', 2)), Item.of(AC('neptunium_nugget', 5)).withChance(.5)], AC('neptunes_bounty')).processingTime(500)

	donutCraft(event, AP('plating_block', 8), CR('iron_sheet'), MC('stone'))

	// event.custom({
	// 	"type": "thermal:refinery",
	// 	"ingredient": {
	// 		"fluid": "kubejs:crude_oil",
	// 		"amount": 100
	// 	},
	// 	"result": [
	// 		{
	// 			"fluid": "thermal:heavy_oil",
	// 			"amount": 40
	// 		},
	// 		{
	// 			"fluid": "thermal:light_oil",
	// 			"amount": 60
	// 		},
	// 		{
	// 			"item": "thermal:bitumen",
	// 			"chance": 0.10
	// 		}
	// 	],
	// 	"energy": 6000
	// })


	let cast_block = (fluid, item) => {
		event.custom({
			"type": "tconstruct:casting_basin",
			"fluid": { "name": fluid, "amount": 1296 },
			"result": { "item": item },
			"cooling_time": 150
		})
	}

	let cast = (type, fluid, amount, item, time) => {
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": { "tag": "tconstruct:casts/single_use/" + type },
			"cast_consumed": true,
			"fluid": { "name": fluid, "amount": amount },
			"result": { "item": item },
			"cooling_time": time
		})
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": { "tag": "tconstruct:casts/multi_use/" + type },
			"fluid": { "name": fluid, "amount": amount },
			"result": { "item": item },
			"cooling_time": time
		})
	}

	// event.remove({ id: TC("smeltery/casting/metal/steel/ingot_gold_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/ingot_sand_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/plate_gold_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/plate_sand_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/gear_gold_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/gear_sand_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/nugget_gold_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/nugget_sand_cast") })
	// event.remove({ id: TC("smeltery/casting/metal/steel/block") })

	event.remove({ id: TC("smeltery/casting/metal/copper/ingot_gold_cast") })
	event.remove({ id: TC("smeltery/casting/metal/copper/ingot_sand_cast") })
	event.remove({ id: TC("smeltery/casting/metal/copper/nugget_gold_cast") })
	event.remove({ id: TC("smeltery/casting/metal/copper/nugget_sand_cast") })
	event.remove({ id: TC("smeltery/casting/metal/copper/block") })

	event.remove({ id: TC("smeltery/casting/metal/silver/ingot_gold_cast") })
	event.remove({ id: TC("smeltery/casting/metal/silver/ingot_sand_cast") })
	event.remove({ id: TC("smeltery/casting/metal/silver/nugget_gold_cast") })
	event.remove({ id: TC("smeltery/casting/metal/silver/nugget_sand_cast") })
	event.remove({ id: TC("smeltery/casting/metal/silver/block") })


	cast("ingot", KJ('plastic'), 90, KJ('plastic'), 20)
	cast("ingot", TC("molten_silver"), 90, TE("silver_ingot"), 50)
	cast("nugget", TC("molten_silver"), 10, TE("silver_nugget"), 17)
	cast_block(TC("molten_silver"), TE("silver_block"))

	cast("ingot", TC("molten_copper"), 90, MC("copper_ingot"), 50)
	cast("nugget", TC("molten_copper"), 10, CR("copper_nugget"), 17)
	cast_block(TC("molten_copper"), MC("copper_block"))


	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
			"tag": "forge:rods/blaze"
		},
		"result": {
			"fluid": "tconstruct:blazing_blood",
			"amount": 100
		},
		"temperature": 790,
		"time": 40
	})


	event.custom({
		"type": "tconstruct:ore_melting",
		"ingredient": {
			"tag": "forge:ores/cobalt"
		},
		"result": {
			"fluid": "tconstruct:molten_cobalt",
			"amount": 90
		},
		"temperature": 950,
		"time": 97,
		"byproducts": [
			{
				"fluid": "tconstruct:molten_iron",
				"amount": 30
			}
		]
	})

	event.custom({
		"type": "tconstruct:ore_melting",
		"ingredient": {
			"tag": "forge:ores/netherite_scrap"
		},
		"result": {
			"fluid": "tconstruct:molten_debris",
			"amount": 90
		},
		"temperature": 1175,
		"time": 143,
		"byproducts": [
			{
				"fluid": "tconstruct:molten_diamond",
				"amount": 30
			},
			{
				"fluid": "tconstruct:molten_gold",
				"amount": 90
			}
		]
	})

	event.custom({
		"type": "thermal:refinery",
		"ingredient": {
			"fluid": "thermal:glowstone",
			"amount": 1000
		},
		"result": [
			{
				"item": "thermal:lumium_ingot"
			}
		],
		"energy": 2000
	})

	event.custom({
		"type": "thermal:refinery",
		"ingredient": {
			"fluid": "thermal:redstone",
			"amount": 1000
		},
		"result": [
			{
				"item": "thermal:signalum_ingot"
			}
		],
		"energy": 2000
	})


}

function prettierpipes(event) {

	event.remove({ output: PP('pipe') })
	event.remove({ output: PP('blank_module') })
	event.shaped(PP("pipe", 8), [
		'PMP'
	], {
		P: CR('brass_sheet'),
		M: CR('brass_ingot')
	})

	event.shaped("8x pipez:energy_pipe", [
		'PMP'
	], {
		P: TE('invar_ingot'),
		M: MC('redstone')
	})

	let module = (type, result) => {
		event.remove({ output: PP(result) })
		event.stonecutting(PP(result), 'kubejs:pipe_module_' + type)
	}

	module('utility', 'filter_increase_modifier')
	module('utility', 'tag_filter_modifier')
	module('utility', 'mod_filter_modifier')
	module('utility', 'nbt_filter_modifier')
	module('utility', 'damage_filter_modifier')
	module('utility', 'round_robin_sorting_modifier')
	module('utility', 'random_sorting_modifier')
	module('utility', 'redstone_module')
	module('utility', 'stack_size_module')
	module('utility', 'low_high_priority_module')
	module('utility', 'medium_high_priority_module')
	module('utility', 'high_high_priority_module')
	module('utility', 'low_low_priority_module')
	module('utility', 'medium_low_priority_module')
	module('utility', 'high_low_priority_module')

	let tiers = ['low', 'medium', 'high']
	for (var i = 0; i < tiers.length; i++) {
		let tier = 'tier_' + (i + 1)
		let prefix = tiers[i] + "_"
		module(tier, prefix + 'extraction_module')
		module(tier, prefix + 'retrieval_module')
		module(tier, prefix + 'speed_module')
		module(tier, prefix + 'filter_module')
		module(tier, prefix + 'crafting_module')
	}

}

function barrels(event) {
	event.remove({ mod: "metalbarrels" })

	let smithAndMechCraft = (r, i1, i2) => {
		event.smithing(r, i1, i2)
		event.recipes.createMechanicalCrafting(r, "AB", { A: i1, B: i2 })
	}

	event.remove({ id: TE("dynamo_gourmand") })
	smithAndMechCraft(TE("dynamo_gourmand"), TE("dynamo_stirling"), [MC("golden_carrot")])
	smithAndMechCraft(TE("dynamo_gourmand"), TE("dynamo_stirling"), [MC("golden_apple")])
	event.remove({ id: TE("dynamo_lapidary") })
	smithAndMechCraft(TE("dynamo_lapidary"), TE("dynamo_numismatic"), [TE("lapis_gear")])
	event.remove({ id: TE("dynamo_disenchantment") })
	smithAndMechCraft(TE("dynamo_disenchantment"), TE("dynamo_compression"), ["forbidden_arcanus:rune"])

	smithAndMechCraft("metalbarrels:copper_barrel", MC("barrel"), "alloyed:bronze_sheet")
	smithAndMechCraft("metalbarrels:iron_barrel", MC("barrel"), "alloyed:steel_sheet")
	smithAndMechCraft("metalbarrels:silver_barrel", MC("barrel"), "forbidden_arcanus:rune")
	smithAndMechCraft("metalbarrels:gold_barrel", MC("barrel"), TC("cobalt_ingot"))

	event.shapeless("metalbarrels:wood_to_copper", ["metalbarrels:copper_barrel"])
	event.shapeless("metalbarrels:wood_to_iron", ["metalbarrels:iron_barrel"])
	event.shapeless("metalbarrels:wood_to_silver", ["metalbarrels:silver_barrel"])
	event.shapeless("metalbarrels:wood_to_gold", ["metalbarrels:gold_barrel"])
}

function rocketScience(event) {

	

	let gear = TE("diamond_gear")
	let plastic = KJ("plastic")
	let steel = "alloyed:steel_sheet"
	let machine = AE2("controller")
	let matrix = KJ("computation_matrix")

	let cool_glass = "create_crystal_clear:brass_glass_casing"
	let nose_cone = "beyond_earth:rocket_nose_cone"
	let fin = "beyond_earth:rocket_fin"
	let frame = "beyond_earth:engine_frame"
	let engine_t1 = "beyond_earth:steel_engine"
	let tank_t1 = "beyond_earth:steel_tank"
	let failed_engine_t1 = KJ("failed_steel_engine")


	event.recipes.createMechanicalCrafting("beyond_earth:engine_frame", [
		' S ',
		'S S',
		'S S'
	], {
		S:"createbigcannons:nethersteel_ingot"
	})

	let t = KJ('incomplete_steel_engine')
	event.recipes.createSequencedAssembly([
		Item.of(engine_t1).withChance(1),
		Item.of("kubejs:failed_steel_engine").withChance(500)
	], "beyond_earth:engine_frame", [
		event.recipes.createDeploying(t, [t, KJ("explosive_mechanism")]),
		event.recipes.createDeploying(t, [t, KJ("pressure_mechanism")]),
		event.recipes.createDeploying(t, [t, CR("brass_sheet")])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:steel_engine')


	event.custom({
		"type": "createbigcannons:melting",
		"ingredients": [
		  {
			"item": "kubejs:failed_steel_engine"
		  }
		],
		"results": [
		  {
			"fluid": "createbigcannons:molten_nethersteel",
			"amount": 450
		  },
		  {
			"fluid": "tconstruct:molten_brass",
			"amount": 90
		  },
		],
		"processingTime": 180,
		"heatRequirement": "heated"
	})

	event.recipes.createMechanicalCrafting("beyond_earth:rocket_fin", [
		'SS ',
		'SSS',
		'SSS'
	], {
		S:"alloyed:steel_sheet"
	})

	event.recipes.createMechanicalCrafting(nose_cone, [
		' S ',
		'SBS'
	], {
		S:"createbigcannons:nethersteel_ingot",
		B:"alloyed:steel_block"
	})

	event.recipes.createMechanicalCrafting("beyond_earth:rocket_t1", [
		'  N  ',
		' BGB ',
		' BTB ',
		' BTB ',
		'FBTBF',
		'FTETF'
	], {
		E: engine_t1,
		B: CR("brass_block"),
		N: nose_cone,
		F: fin,
		G: cool_glass,
		T: tank_t1
	})




	let smithAndMechCraft = (r, i1, i2) => {
		event.smithing(r, i1, i2)
		event.recipes.createMechanicalCrafting(r, "AB", { A: i1, B: i2 })
	}

	smithAndMechCraft(tank_t1, CR('fluid_tank'), "alloyed:steel_sheet")


	event.recipes.createMechanicalCrafting("beyond_earth:oxygen_loader", [
		'AAA',
		'P R',
		'AAA'
	], {
		A: steel,
		P: CR('mechanical_pump'),
		R: TE("rf_coil")
	})

	event.recipes.createMechanicalCrafting("beyond_earth:rocket_launch_pad", [
		'PPP',
		'III'
	], {
		P: steel,
		I: MC("iron_block"),
	})

	let pattern = [
		' A ',
		'GSG',
		' A '
	];

	event.recipes.createMechanicalCrafting("beyond_earth:oxygen_mask", pattern,
		{
			A: steel,
			G: CR("brass_sheet"),
			S: CR("diving_helmet")
		})
	
	event.recipes.createMechanicalCrafting("beyond_earth:space_suit", pattern,
		{
			A: steel,
			G: CR("brass_sheet"),
			S: CR("copper_backtank")
		})

	event.recipes.createMechanicalCrafting("beyond_earth:space_pants", pattern,
		{
			A: steel,
			G: CR("brass_sheet"),
			S: TE("hazmat_leggings")
		})

	event.recipes.createMechanicalCrafting("beyond_earth:space_boots", pattern,
		{
			A: steel,
			G: CR("brass_sheet"),
			S: TE("hazmat_boots")
		})



// 	let smithAndMechCraft = (r, i1, i2) => {
// 		event.smithing(r, i1, i2)
// 		event.recipes.createMechanicalCrafting(r, "AB", { A: i1, B: i2 })
// 	}


	event.recipes.createMixing(
		[Fluid.of(TE("heavy_oil"), 100), Fluid.of(TE("light_oil"), 70), TE("tar")],
		[Fluid.of(KJ("crude_oil"), 500)]
	).superheated()
	
	event.recipes.createMixing(
		[Fluid.of(TE("refined_fuel"), 20), Fluid.of(KJ("gas"), 75), TE("sulfur_dust")],
		[Fluid.of(TE("light_oil"), 100)]
	).heated()


	event.recipes.thermal.compression_fuel(Fluid.of(KJ("gas"))).energy(100000)
	// event.recipes.thermal.compression_fuel(Fluid.of("advancedrocketry:oxygen")).energy(10000)


}

function drawersop(event) {
	let drawer_types = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak']
	let drawer_sizes = ['1', '2', '4']
	event.replaceInput({ id: SD('compacting_drawers_3') }, MC('iron_ingot'), CR('zinc_ingot'))
	event.remove({ output: SD("upgrade_template") })

	drawer_types.forEach(e => {

		let trim = SD(`${e}_trim`)
		let plank = MC(`${e}_planks`)
		event.remove({ id: trim })
		event.shaped(Item.of(trim, 4), [
			'SSS',
			'PMP',
			'SSS'
		], {
			P: CR('zinc_ingot'),
			M: '#forge:chests/wooden',
			S: plank
		})

		event.stonecutting(SD("upgrade_template"), trim)

		drawer_sizes.forEach(size => {
			let full = SD(`${e}_full_drawers_${size}`)
			let half = SD(`${e}_half_drawers_${size}`)
			event.remove({ id: full })
			event.remove({ id: half })
			event.stonecutting(full, trim)
			event.stonecutting(Item.of(half, 2), trim)
		})
	})

}

function unify(event) {

	event.recipes.createMilling(TE("nickel_dust"), TE("nickel_ingot"))
	event.recipes.createMilling(TE("lead_dust"), TE("lead_ingot"))
	event.recipes.createMilling(TE("copper_dust"), MC("copper_ingot"))
	event.recipes.createMilling(KJ("zinc_dust"), CR("zinc_ingot"))

	event.replaceInput({ id: OC("ritual/summon_djinni_crusher") }, '#forge:raw_materials/silver', CR('raw_zinc'))
	
	// event.replaceInput({}, '#forge:dusts/quartz', AE2('nether_quartz_dust'))
	// event.replaceOutput({}, TE("quartz_dust"), AE2("nether_quartz_dust"))
	event.replaceOutput({ id: CR('compat/ae2/milling/gold') }, AE2('gold_dust'), TE('gold_dust'))
	event.replaceOutput({ id: CR('compat/ae2/milling/iron') }, AE2('iron_dust'), TE('iron_dust'))
	event.replaceOutput({ id: OC('crushing/iron_dust_from_ingot') }, OC('iron_dust'), TE('iron_dust'))
	event.replaceOutput({ id: OC('crushing/gold_dust_from_ingot') }, OC('gold_dust'), TE('gold_dust'))
	event.replaceOutput({ id: OC('crushing/obsidian_dust') }, OC('obsidian_dust'), CR('powdered_obsidian'))
	event.replaceInput({ id: OC('crafting/chalk_purple_impure') }, OC('obsidian_dust'), CR('powdered_obsidian'))
	event.replaceInput({ id: OC('ritual/craft_infused_lenses') }, F('#ingots/silver'), TE('nickel_ingot'))
	event.replaceInput({ id: OC('crafting/magic_lamp_empty') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: OC('crafting/lens_frame') }, F('#ingots/silver'), TE('nickel_ingot'))
	event.replaceInput({ id: TE('augments/rf_coil_storage_augment') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: TE('augments/rf_coil_xfer_augment') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: TE('augments/rf_coil_augment') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: TE('tools/detonator') }, F('#ingots/silver'), TE('lead_ingot'))

	event.replaceOutput({ type: OC("crushing") }, OC('copper_dust'), TE('copper_dust'))
	event.replaceOutput({ type: OC("crushing") }, OC('iron_dust'), TE('iron_dust'))
	event.replaceOutput({ type: OC("crushing") }, OC('gold_dust'), TE('gold_dust'))
	event.replaceOutput({ type: OC("crushing") }, OC('silver_dust'), TE('silver_dust'))

	event.replaceInput({}, '#forge:plates/iron', CR('iron_sheet'))
	event.replaceInput({}, '#forge:plates/gold', CR('golden_sheet'))
	event.replaceInput({}, '#forge:dusts/gold', TE('gold_dust'))
	event.replaceInput({}, '#forge:dusts/iron', TE('iron_dust'))
	event.replaceInput({}, '#forge:dusts/copper', TE('copper_dust'))
	event.replaceInput({}, '#forge:plates/copper', CR('copper_sheet'))
	event.replaceInput({}, '#forge:ingots/copper', MC('copper_ingot'))
	event.replaceOutput({}, '#forge:ingots/copper', MC('copper_ingot'))
	event.replaceInput({}, '#forge:nuggets/copper', CR('copper_nugget'))
	event.replaceOutput({}, '#forge:nuggets/copper', CR('copper_nugget'))
	event.replaceOutput({}, '#forge:ores/copper', '#minecraft:copper_ores')
	event.replaceOutput({}, '#forge:nuggets/silver', TE('silver_nugget'))
	event.replaceOutput({}, '#forge:ingots/silver', TE('silver_ingot'))
	event.replaceOutput({}, '#forge:storage_blocks/silver', TE('silver_block'))
	event.replaceInput({}, '#forge:nuggets/silver', TE('silver_nugget'))
	event.replaceInput({}, '#forge:ingots/silver', TE('silver_ingot'))
	event.replaceInput({}, '#forge:storage_blocks/silver', TE('silver_block'))
	event.replaceInput({}, '#forge:storage_blocks/copper', MC('copper_block'))
	event.replaceOutput({}, '#forge:storage_blocks/copper', MC('copper_block'))
	event.replaceInput({}, '#forge:gems/ruby', TE('ruby'))
	event.replaceInput({}, '#forge:gems/sapphire', TE('sapphire'))
	// event.replaceInput({ id: "exchangers:thermal/thermal_exchanger_core_tier1" }, TE('ender_pearl_dust'), AE2('ender_dust'))

	event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25).toResultJson()], 'biomesoplenty:black_sand')
	event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25).toResultJson()], 'biomesoplenty:white_sand')
	event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25).toResultJson()], 'biomesoplenty:orange_sand')

	event.replaceInput({ type: "minecraft:crafting_shaped" }, '#forge:ingots/tin', CR('zinc_ingot'))

	event.replaceInput({}, '#forge:plates/bronze', TE('nickel_plate'))
	event.replaceInput({}, '#forge:ingots/bronze', 'alloyed:bronze_ingot')
	event.replaceInput({}, '#forge:plates/silver', TE('invar_plate'))
	event.replaceInput({}, '#forge:plates/constantan', TE('signalum_plate'))
	event.replaceInput({}, '#forge:plates/electrum', TE('constantan_plate'))
	event.replaceInput({}, '#forge:ingots/electrum', TE('constantan_ingot'))

	event.replaceInput({}, '#forge:gears/tin', TE('lead_gear'))
	event.replaceInput({}, '#forge:gears/bronze', TE('nickel_gear'))
	event.replaceInput({}, '#forge:gears/silver', TE('invar_gear'))
	event.replaceInput({}, '#forge:gears/constantan', TE('signalum_gear'))
	event.replaceInput({}, '#forge:gears/electrum', TE('constantan_gear'))

	event.replaceInput({}, '#forge:plates/invar', TE('invar_ingot'))



	event.recipes.createPressing([TE('lead_plate')], TE('lead_ingot'))
	event.recipes.createPressing([TE('enderium_plate')], TE('enderium_ingot'))
	event.recipes.createPressing([TE('lumium_plate')], TE('lumium_ingot'))
	event.recipes.createPressing([TE('signalum_plate')], TE('signalum_ingot'))
	event.recipes.createPressing([TE('constantan_plate')], TE('constantan_ingot'))

	let woodcutting = (mod, log, planks, slab) => {
		event.recipes.createCutting([mod + ":stripped_" + log], mod + ":" + log).processingTime(50)
		event.recipes.createCutting([Item.of(mod + ":" + planks, 6)], mod + ":stripped_" + log).processingTime(50)
		event.recipes.createCutting([Item.of(mod + ":" + slab, 2)], mod + ":" + planks).processingTime(50)
	}

	woodcutting("forbidden_arcanus", "cherrywood_log", "cherrywood_planks", "cherrywood_slab")
	woodcutting("forbidden_arcanus", "mysterywood_log", "mysterywood_planks", "mysterywood_slab")
	woodcutting("architects_palette", "twisted_log", "twisted_planks", "twisted_slab")
	woodcutting("tconstruct", "greenheart_log", "greenheart_planks", "greenheart_planks_slab")
	woodcutting("tconstruct", "skyroot_log", "skyroot_planks", "skyroot_planks_slab")
	woodcutting("tconstruct", "bloodshroom_log", "bloodshroom_planks", "bloodshroom_planks_slab")

	event.replaceInput({ id: TC("smeltery/casts/gold_casts/ingots") }, MC("copper_ingot"), "#forge:ingots")
	event.replaceInput({ id: TC("smeltery/casts/gold_casts/nuggets") }, MC("copper_nugget"), "#forge:nuggets")
	event.replaceInput({ id: TC("smeltery/casts/gold_casts/plates") }, CR("iron_sheet"), "#forge:plates")
}

function trickierWindmills(event) {
	event.remove({ output: 'create:sail_frame' })
	event.remove({ output: 'create:white_sail' })
	event.shapeless('create:sail_frame', ['create:white_sail'])
	event.shaped('2x create:white_sail', [
		'SSS',
		'NAN',
		'SSS'
	], {
		A: FD('canvas'),
		N: CR('zinc_nugget'),
		S: 'minecraft:stick'
	})
}

function rubberMatters(event) {
	let overrideTreeOutput = (id, trunk, leaf) => {
		event.remove({ id: id })
		event.custom({
			"type": "thermal:tree_extractor",
			"trunk": trunk,
			"leaves": leaf,
			"result": {
				"fluid": "thermal:resin",
				"amount": 25
			}
		});
	}

	overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_jungle'), MC('jungle_log'), MC('jungle_leaves'))
	overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_spruce'), MC('spruce_log'), MC('spruce_leaves'))
	overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_dark_oak'), MC('dark_oak_log'), MC('dark_oak_leaves'))
	overrideTreeOutput(TE('compat/biomesoplenty/tree_extractor_bop_maple'), MC('oak_log'), 'biomesoplenty:maple_leaves')

	event.remove({ id: CR('crafting/kinetics/belt_connector') })
	event.shaped(CR('belt_connector', 3), [
		'SSS',
		'SSS'
	], {
		S: TE('cured_rubber')
	})

	event.recipes.createCompacting('1x ' + TE("rubber"), [Fluid.of(MC('water'), 250), F("#vines", 4)])
	event.recipes.createCompacting('1x ' + TE("rubber"), [Fluid.of(MC('water'), 250), '4x #minecraft:flowers'])
	event.recipes.createCompacting('1x ' + TE("rubber"), [Fluid.of(TE('resin'), 250)])

	event.remove({ id: 'thermal:rubber_3' })
	event.remove({ id: 'thermal:rubber_from_dandelion' })
	event.remove({ id: 'thermal:rubber_from_vine' })

}

function dioriticAndesite(event) {
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })
	event.remove({ id: CR('crafting/materials/andesite_alloy') })
	event.remove({ id: CR('crafting/materials/andesite_alloy_from_zinc') })
	event.remove({ id: CR('mixing/andesite_alloy') })
	event.remove({ id: CR('mixing/andesite_alloy_from_zinc') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TC('compat/create/andesite_alloy_zinc') })
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })
	event.remove({ id: CR('milling/granite')})


	event.shaped(Item.of(KJ('andesite_blend'), 2), [
		'SA',
		'AS'
	], {
		A: MC('andesite'),
		S: MC('clay_ball')
	})

	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'SA',
		'AS'
	], {
		A: KJ('andesite_blend'),
		S: CR('zinc_nugget')
	})
	// event.shaped(Item.of(CR('andesite_alloy'), 2), [
	// 	'AA',
	// 	'SS'
	// ], {
	// 	A: ['minecraft:andesite', CR('andesite_cobblestone')],
	// 	S: AP('algal_brick')
	// })

	// event.recipes.createMixing(Item.of(AP('algal_blend'), 2), ['minecraft:clay_ball_ball', ['minecraft:kelp', 'minecraft:seagrass']])
	event.recipes.createMixing(Item.of(CR('andesite_alloy'), 2), [CR("zinc_nugget"), KJ("andesite_blend")])
	event.recipes.createMixing(Item.of(KJ('andesite_blend')), [KJ('andesite_dust'), MC('clay_ball')])
	event.recipes.createMilling([	Item.of(MC('red_sand')).withChance(0.35),
									Item.of(KJ('asurine_bits')).withChance(0.65)]
								  , MC("granite"))
								  
	event.recipes.createMilling(Item.of(KJ('andesite_dust')), MC("andesite"))
	event.recipes.createSplashing([Item.of(CR("zinc_nugget"))], KJ('asurine_bits'))
}

function oreProcessing(event) {

	let stone = Item.of(MC("cobblestone"), 1).withChance(.5)
	let otherstone = Item.of(OC("otherstone"), 1).withChance(.5)



	event.recipes.createCrushing([Item.of("forbidden_arcanus:stellarite_piece", 1), Item.of("forbidden_arcanus:stellarite_piece", 1).withChance(.25), stone], "forbidden_arcanus:stella_arcanum")
	event.recipes.createCrushing([Item.of("forbidden_arcanus:xpetrified_orb", 2), Item.of("forbidden_arcanus:xpetrified_orb", 1).withChance(.25), stone], "forbidden_arcanus:xpetrified_ore")
	event.recipes.createCrushing([Item.of("forbidden_arcanus:arcane_crystal", 2), Item.of("forbidden_arcanus:arcane_crystal_dust", 1).withChance(.25), stone], "forbidden_arcanus:arcane_crystal_ore")
	event.recipes.createCrushing([Item.of(OC("iesnium_dust"), 2), Item.of(OC("iesnium_dust"), 1).withChance(.25), otherstone], OC("iesnium_ore"))
	event.recipes.createCrushing([Item.of(TE("sapphire"), 2), Item.of(TE("sapphire"), 1).withChance(.25), stone], TE("sapphire_ore"))
	event.recipes.createCrushing([Item.of(TE("ruby"), 2), Item.of(TE("ruby"), 1).withChance(.25), stone], TE("ruby_ore"))

	event.recipes.createMilling(['4x ' + MC('redstone')], TE('cinnabar')).processingTime(700)
	event.recipes.createCrushing(['6x ' + MC('redstone')], TE('cinnabar')).processingTime(500)
	event.recipes.thermal.pulverizer(['8x ' + MC('redstone')], TE('cinnabar')).energy(10000)

	event.recipes.createMilling([TE('sulfur_dust')], TE('sulfur')).processingTime(500)
	event.recipes.createMilling([TE('niter_dust')], TE('niter')).processingTime(500)
	event.recipes.createMilling([TE('apatite_dust')], TE('apatite')).processingTime(500)

	let remove_smelts = (tag) =>{
		event.remove({ input: tag, type: TE("smelter") })
		event.remove({ input: tag, type: TE("pulverizer") })
		event.remove({ input: tag, type: MC("blasting") })
		event.remove({ input: tag, type: MC("smelting") })
		event.remove({ input: tag, type: CR("crushing") })
		event.remove({ input: tag, type: CR("milling") })
		// event.remove({ input: tag, type: TC("melting"), mod: 'thermal'})
	}

	let dust_process = (name, ingot, nugget, dust, ore_raw, ore_block, byproduct, fluid_byproduct_name) => {
		let fluid = TC("molten_" + name)
		let fluid_byproduct = TC("molten_" + fluid_byproduct_name)
		let crushed = CR('crushed_' + name + '_ore')
		
		let deepslate_ore = ore_block.replace(":", ":deepslate_")
		

		event.remove({ id: TC('smeltery/melting/metal/' + name + '/raw') })
		event.remove({ id: TC('smeltery/melting/metal/' + name + '/raw_block') })
		event.remove({ input: ore_raw, type: TC("melting") })
		
		remove_smelts("#forge:ores/" + name)
		remove_smelts("#forge:raw_materials/" + name)
		remove_smelts("#forge:storage_blocks/raw_" + name)

		event.smelting(Item.of(nugget, 3), ore_raw)
		event.smelting(Item.of(nugget, 6), crushed)
		event.smelting(Item.of(nugget, 2), dust).cookingTime(40)

		event.recipes.createMilling([Item.of(crushed, 1), stone], ore_block)
		event.recipes.createMilling([Item.of(crushed, 1), stone], deepslate_ore)
		event.recipes.createMilling([Item.of(dust, 3)], ore_raw)
		event.recipes.createMilling([Item.of(dust, 4)], crushed)
		
		event.recipes.createCrushing([Item.of(crushed, 1), CR('experience_nugget'), MC('cobblestone')], ore_raw)
		// event.recipes.createCrushing([Item.of(dust, 3), Item.of(dust, 3).withChance(0.5)], ore_raw)

		event.recipes.thermal.pulverizer([Item.of(dust, 6)], ore_raw).energy(15000)
		event.recipes.thermal.pulverizer([Item.of(dust, 6)], crushed).energy(10000)
		event.recipes.thermal.pulverizer([Item.of(dust, 6)], ore_block).energy(3000)
		event.recipes.thermal.pulverizer([Item.of(dust, 9)], deepslate_ore).energy(6000)
		event.recipes.thermal.crucible(Fluid.of(fluid, 90), ingot).energy(2000)

		event.recipes.thermal.crucible(Fluid.of(fluid, 60), dust).energy(3000)
		event.recipes.createSplashing([Item.of(nugget, 2)], dust)
		event.recipes.createMixing([Fluid.of(fluid, 180)], [Item.of(dust, 3), AE2('matter_ball')]).superheated()


		event.custom({
			"type": "thermal:smelter",
			"ingredient": {
				"item": ore_raw
			},
			"result": [
				{
					"item": nugget,
					"chance": 9.0
				},
				{
					"item": byproduct,
					"chance": (byproduct.endsWith('nugget') ? 1.8 : 0.2)
				},
				{
					"item": "thermal:rich_slag",
					"chance": 0.2
				}
			],
			"experience": 0.2,
			"energy": 20000
		})
		
		event.custom({
			"type": "tconstruct:melting",
			"ingredient": {
				"item": ore_raw
			},
			"result": {
				"fluid": fluid,
				"amount": 60
			},
			"temperature": 500,
			"time": 90,
			"byproducts": [
				{
					"fluid": fluid_byproduct,
					"amount": 10
				}
			]
		});

		event.custom({
			"type": "tconstruct:melting",
			"ingredient": {
				"item": dust
			},
			"result": {
				"fluid": fluid,
				"amount": 40
			},
			"temperature": 500,
			"time": 30,
			"byproducts": [
				{
					"fluid": fluid_byproduct,
					"amount": 10
				}
			]
		});

	}

	dust_process('nickel', 	TE('nickel_ingot'), TE('nickel_nugget'), TE('nickel_dust'), TE('raw_nickel'), TE('nickel_ore'),	 CR('copper_nugget'), 'copper')
	dust_process('lead', 	TE('lead_ingot'), 	TE('lead_nugget'), 	 TE('lead_dust'), 	TE('raw_lead'),   TE('lead_ore'), 	 MC('iron_nugget'), 'iron')
	dust_process('iron', 	MC('iron_ingot'), 	MC('iron_nugget'), 	 TE('iron_dust'), 	MC('raw_iron'),   MC('iron_ore'),	 TE('nickel_nugget'), 'nickel')
	dust_process('gold', 	MC('gold_ingot'), 	MC('gold_nugget'), 	 TE('gold_dust'), 	MC('raw_gold'),   MC('gold_ore'),TE('cinnabar'), 'zinc')
	dust_process('copper', 	MC('copper_ingot'), CR('copper_nugget'), TE('copper_dust'), MC('raw_copper'), MC('copper_ore'),  MC('gold_nugget'), 'gold')
	dust_process('zinc', 	CR('zinc_ingot'), 	CR('zinc_nugget'), 	 KJ('zinc_dust'), 	CR('raw_zinc'),   CR('zinc_ore'), 	 TE('sulfur'), 'lead')

	event.replaceInput({ id: TE("machine/smelter/smelter_iron_ore") }, MC('iron_ore'), CR('crushed_iron_ore'))
	event.replaceInput({ id: TE("machine/smelter/smelter_gold_ore") }, MC('gold_ore'), CR('crushed_gold_ore'))
}

function alloys(event) {

	event.remove({ id: TC('smeltery/alloys/molten_bronze') })
	event.remove({ id: TC('smeltery/alloys/molten_brass') })
	event.remove({ id: TC('smeltery/alloys/molten_invar') })
	event.remove({ id: TC('smeltery/alloys/molten_electrum') })
	event.remove({ id: TC('smeltery/alloys/molten_constantan') })
	event.remove({ id: TC('smeltery/alloys/molten_rose_gold') })
	event.remove({ id: TC('smeltery/alloys/molten_enderium') })
	event.remove({ id: TC('smeltery/alloys/molten_lumium') })
	event.remove({ id: TC('smeltery/alloys/molten_signalum') })

	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "tconstruct:molten_silver", "amount": 90 },
			{ "name": "tconstruct:molten_copper", "amount": 90 },
			{ "name": "thermal:redstone", "amount": 1000 }
		],
		"result": {
			"fluid": "tconstruct:molten_signalum",
			"amount": 90
		},
		"temperature": 1000
	})

	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "tconstruct:molten_silver", "amount": 90 },
			{ "name": "tconstruct:molten_copper", "amount": 90 },
			{ "name": "thermal:glowstone", "amount": 1000 }
		],
		"result": {
			"fluid": "tconstruct:molten_lumium",
			"amount": 90
		},
		"temperature": 1000
	})

	event.remove({ type: MC("crafting_shapeless"), output: TE('constantan_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('electrum_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('lumium_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('signalum_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('enderium_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('bronze_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('invar_dust') })

	event.recipes.createMixing(Fluid.of(TC('molten_brass'), 18), [Fluid.of(TC('molten_copper'), 9), Fluid.of(TC('molten_zinc'), 9)]).processingTime(1)
	event.recipes.createMixing(Fluid.of(TC('molten_constantan'), 4), [Fluid.of(TC('molten_copper'), 4), Fluid.of(TC('molten_nickel'), 4)]).processingTime(1)
	event.recipes.createMixing(Fluid.of(TC('molten_rose_gold'), 4), [Fluid.of(TC('molten_copper'), 4), Fluid.of(TC('molten_gold'), 4)]).processingTime(1)

	event.recipes.thermal.smelter([KJ("invar_compound"), KJ("invar_compound")], [TE("nickel_ingot"), MC("iron_ingot")])
	event.recipes.thermal.smelter(CR("brass_ingot", 2), [MC("copper_ingot"), CR("zinc_ingot")])
	event.recipes.thermal.smelter(TC("rose_gold_ingot", 2), [MC("copper_ingot"), MC("gold_ingot")])
	event.recipes.thermal.smelter(TE("constantan_ingot", 2), [MC("copper_ingot"), TE("nickel_ingot")])

}

function electronTube(event) {

	event.recipes.createFilling(CR("electron_tube"), [CR('polished_rose_quartz'), Fluid.of(TC('molten_iron'), 10)])

	let redstone = MC('redstone')
	event.shapeless('create:rose_quartz', [[MC('quartz'), AE2('certus_quartz_crystal'), AE2('charged_certus_quartz_crystal')], redstone, redstone, redstone, redstone])

	event.recipes.createMilling([AE2('certus_quartz_dust')], '#ae2:all_certus_quartz').processingTime(200)
	
	// event.recipes.createMilling([AE2('nether_quartz_dust')], '#ae2:crystals/nether').processingTime(200)
	
	event.remove({ id: CR('compat/ae2/milling/sky_stone_block') })
	event.remove({ id: CR('crushing/diorite')})
	// event.remove({ id: CR('compat/ae2/milling/nether_quartz') })
	event.remove({ id: CR('compat/ae2/milling/certus_quartz') })
	event.remove({ id: CR('crafting/materials/electron_tube') })
	event.remove({ id: CR('crafting/materials/rose_quartz') })
	event.remove({ id: TC('smeltery/casting/obsidian/block') })

	event.remove({ id: TC('smeltery/alloys/molten_obsidian') })
	event.remove({ id: /tconstruct:smeltery\/melting\/obsidian\/.*/ })
	event.remove({ id: TC('smeltery/melting/metal/slimesteel/reinforcement') })
	event.remove({ id: TC('smeltery/melting/metal/iron/reinforcement') })
	event.remove({ id: TC('smeltery/melting/diamond/enchanting_table') })

	event.recipes.createMechanicalCrafting(Item.of(AE2('certus_crystal_seed'), 2), ['A'], { A: '#ae2:all_certus_quartz' })
	// event.recipes.createMechanicalCrafting(Item.of(AE2('nether_quartz_seed'), 2), ['A'], { A: AE2('#crystals/nether') })
	event.recipes.createMechanicalCrafting(Item.of(AE2('fluix_crystal_seed'), 2), ['A'], { A: '#ae2:all_fluix' })

	event.recipes.createCompacting(KJ('rose_quartz_seed'),Fluid.of(TE('redstone'), 500) )

	event.recipes.createFilling(KJ('empty_tube'), [MC('glass'), Fluid.of(TC('molten_iron'), 20)])
	event.recipes.createDeploying(CR('electron_tube'), [KJ('empty_tube'), CR('polished_rose_quartz')])
	event.recipes.createDeploying(KJ('diamond_tube'), [KJ('empty_tube'), MC('diamond')])
	event.recipes.createFilling(KJ('golden_tube'), [KJ('empty_tube'), Fluid.of(TC('molten_gold'), 90)])

	let grow = (from, via, to) => {
		event.recipes.createSequencedAssembly([to], from, [
			event.recipes.createFilling(via, [via, Fluid.of(MC('water'), 500)]),
		]).transitionalItem(via)
			.loops(4)
			.id('kubejs:grow_' + to.split(':')[1])
	}

	grow(AE2("certus_crystal_seed"), KJ('growing_certus_seed'), KJ('tiny_certus_crystal'))
	grow(AE2("fluix_crystal_seed"), KJ('growing_fluix_seed'), KJ('tiny_fluix_crystal'))
	grow(KJ("rose_quartz_seed"), KJ('growing_rose_seed'), KJ('tiny_rose_crystal'))
	// grow(AE2("nether_quartz_seed"), KJ('growing_nether_seed'), KJ('tiny_nether_crystal'))

	grow(KJ("tiny_certus_crystal"), KJ('growing_tiny_certus_crystal'), KJ('small_certus_crystal'))
	grow(KJ("tiny_fluix_crystal"), KJ('growing_tiny_fluix_crystal'), KJ('small_fluix_crystal'))
	grow(KJ("tiny_rose_crystal"), KJ('growing_tiny_rose_crystal'), KJ('small_rose_crystal'))
	// grow(KJ("tiny_nether_crystal"), KJ('growing_tiny_nether_crystal'), KJ('small_nether_crystal'))

	grow(KJ("small_certus_crystal"), KJ('growing_small_certus_crystal'), KJ('purified_certus_quartz_crystal'))
	grow(KJ("small_fluix_crystal"), KJ('growing_small_fluix_crystal'), KJ('purified_fluix_crystal'))
	grow(KJ("small_rose_crystal"), KJ('growing_small_rose_crystal'), CR('polished_rose_quartz'))
	// grow(KJ("small_nether_crystal"), KJ('growing_small_nether_crystal'), AE2('purified_nether_quartz_crystal'))

	
	
	
	event.recipes.createMixing(Fluid.of(TC("molten_obsidian"), 500), [AE2('sky_dust'), AE2('sky_dust'), AE2('sky_dust'), AE2('sky_dust'), Fluid.of(MC('water'), 500)])
	
	
	event.recipes.createMixing([AE2('certus_quartz_crystal'), Fluid.of(TE("redstone"), 250)], [AE2('charged_certus_quartz_crystal'), Fluid.of(TC("molten_obsidian"), 250)])
	// event.recipes.createMixing(['create:polished_rose_quartz'], [[/*AE2('purified_nether_quartz_crystal'),*/ KJ('purified_certus_quartz_crystal')], Fluid.of(TE("redstone"), 250)])

}

function andesiteMachine(event) {

	event.replaceInput({ id: CR("crafting/kinetics/brass_hand") }, '#forge:plates/brass', CR('golden_sheet'))
	wood_types.forEach(wood => {
		event.recipes.createCutting('2x ' + wood + '_slab', wood + '_planks').processingTime(150)
	})

	let saw = (id, material) =>{ 
		event.shaped(id, [
			'SSS',
			'SMS',
			'   '
		], {
			S: MC('stick'),
			M: material,
		})
	}
	saw(KJ('stone_saw'), "#forge:cobblestone")
	saw(KJ('iron_saw'), MC("iron_ingot"))
	saw(KJ('diamond_saw'), MC("diamond"))

	event.recipes.createCutting(CR('shaft',2), CR('andesite_alloy'))


	event.shaped('beyond_earth:hammer', [
		'III',
		'III',
		' S '
	], {
		S: MC('stick'),
		I: TC('tough_handle'),
	})

	let transitional = 'kubejs:incomplete_rotation_mechanism'
	event.recipes.createSequencedAssembly([
		'kubejs:rotation_mechanism',
	], '#minecraft:wooden_slabs', [
		event.recipes.createDeploying(transitional, [transitional, CR('cogwheel')]),
		event.recipes.createDeploying(transitional, [transitional, CR('large_cogwheel')]),
		event.recipes.createDeploying(transitional, [transitional, F('#saws')])
	]).transitionalItem(transitional)
		.loops(1)
		.id('kubejs:rotation_mechanism')

	event.shapeless(KJ('rotation_mechanism'), [F('#saws'), CR('cogwheel'), CR('andesite_alloy'), '#minecraft:logs']).id("kubejs:rotation_mechanism_manual_only")
		.damageIngredient(Item.of(KJ('stone_saw')))
		.damageIngredient(Item.of(KJ('iron_saw')))
		.damageIngredient(Item.of(KJ('diamond_saw')))

	// Andesite
	event.shaped(KJ('andesite_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('andesite_casing'),
		S: KJ('rotation_mechanism')
	})

	let andesite_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:andesite_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:andesite_machine')
	}

	event.remove({ output: TE('drill_head') })
	event.shaped(TE('drill_head'), [
		'NN ',
		'NLP',
		' PL'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	event.remove({ output: TE('saw_blade') })
	event.shaped(TE('saw_blade'), [
		'NPN',
		'PLP',
		'NPN'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	event.remove({ output: CR('encased_fan') })
	event.remove({ output: CR('deployer') })
	event.remove({ output: 'sliceanddice:slicer' })
	event.remove({ output: 'thermal:device_tree_extractor' })
	event.remove({ output: 'waterstrainer:strainer_base' })
	event.remove({ output: CR('mechanical_drill') })
	event.remove({ output: CR('mechanical_mixer') })
	event.remove({ output: CR('mechanical_saw') })
	event.remove({ output: CR('mechanical_press') })
	event.remove({ output: 'thermal:dynamo_stirling'})

	event.shaped(CR('encased_fan'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('shaft'), P: CR('propeller'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))

	event.shaped(CR('deployer'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('piston_extension_pole'), P: CR('brass_hand'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_press'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('piston_extension_pole'), P: MC('iron_block'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_mixer'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('cogwheel'), P: CR('whisk'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('sliceanddice:slicer', [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('cogwheel'), P: CR('turntable'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('thermal:device_tree_extractor', [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: MC('bucket'), P: CR('fluid_pipe'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('waterstrainer:strainer_base', [
		'  S',
		'III',
		'AMA'
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: 'createaddition:iron_rod', S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_drill'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('shaft'), P: TE('drill_head'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped(CR('mechanical_saw'), [
		' IS',
		'AMA',
		' P '
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: CR('shaft'), P: TE('saw_blade'), S: Item.of('beyond_earth:hammer').ignoreNBT()})  .damageIngredient(Item.of('beyond_earth:hammer'))
	
	event.shaped('thermal:dynamo_stirling', [
		' PS',
		'AMA',
		'AIA'
	], {M: KJ('andesite_machine'), A: CR('andesite_alloy'), I: MC('furnace'), S: Item.of('beyond_earth:hammer').ignoreNBT(), P:TE('rf_coil')})  .damageIngredient(Item.of('beyond_earth:hammer'))
	

	andesite_machine('create:portable_storage_interface', 2)
	andesite_machine('create:mechanical_harvester', 2)
	andesite_machine('create:mechanical_plough', 2)
	andesite_machine(AE2('sky_compass'), 1, AE2('charged_certus_quartz_crystal'))
	andesite_machine(AE2('charger'), 1, CR('copper_sheet'))
	andesite_machine('create:andesite_funnel', 4)
	andesite_machine('create:andesite_tunnel', 4)
	andesite_machine('kubejs:pipe_module_utility', 4)
	andesite_machine(CR('item_vault'), 2, CR('iron_sheet'))

	andesite_machine('toms_storage:ts.storage_terminal', 1, TE('diamond_gear'))
	event.smithing('toms_storage:ts.crafting_terminal', 'toms_storage:ts.storage_terminal', MC('crafting_table'))

}

function copperMachine(event) {

	// let t = KJ('incomplete_pressure_mechanism')
	// event.recipes.createSequencedAssembly([
	// 	KJ('pressure_mechanism'),
	// ], KJ('rotation_mechanism'), [
	// 	event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
	// 	event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
	// 	event.recipes.createDeploying(t, [t, F('#super_glues')])
	// ]).transitionalItem(t)
	// 	.loops(1)
	// 	.id('kubejs:pressure_mechanism')

	event.shaped(KJ('pressure_mechanism'), [
		'SCS'
	], {
		C: KJ('rotation_mechanism'),
		S: TE('cured_rubber')
	})

	event.shaped(KJ('copper_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('copper_casing'),
		S: KJ('pressure_mechanism')
	})

	event.remove({ id: TC("smeltery/casting/seared/smeltery_controller") })
	event.remove({ id: TC("smeltery/melting/copper/smeltery_controller") })
	donutCraft(event, TC('smeltery_controller'), TC('seared_bricks'), KJ('pressure_mechanism'))

	let copper_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:copper_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:copper_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:copper_machine')
	}

	event.remove({ output: CR('steam_engine') })
	event.remove({ output: CR('spout') })
	event.remove({ output: CR('hose_pulley') })
	event.remove({ output: TE('dynamo_magmatic') })
	event.remove({ output: 'create_enchantment_industry:printer' })

	event.shaped(CR('steam_engine'), [
		' GS',
		'CMC',
		'CBC'
	], {M: KJ('copper_machine'), C: MC('copper_ingot'), G: CR('golden_sheet'), S: Item.of('create:super_glue').ignoreNBT(), B: MC('copper_block')})  .damageIngredient(CR('super_glue'))
	
	event.shaped(CR('spout'), [
		' MS',
		'RHR',
		' R '
	], {M: KJ('copper_machine'), H: MC('hopper'), R: TE('cured_rubber'), S: Item.of('create:super_glue').ignoreNBT()})  .damageIngredient(CR('super_glue'))
	
	event.shaped(CR('hose_pulley'), [
		'  G',
		'PMS',
		' R '
	], {M: KJ('copper_machine'), S: CR('shaft'), R: TE('cured_rubber_block'), G: Item.of('create:super_glue').ignoreNBT(), P: CR('fluid_pipe')})  .damageIngredient(CR('super_glue'))
	
	event.shaped(TE('dynamo_magmatic'), [
		' RS',
		'HMH',
		'HTH'
	], {M: KJ('copper_machine'), H: 'alloyed:steel_ingot', R: TE('rf_coil'), S: Item.of('create:super_glue').ignoreNBT(), T: TC('seared_fuel_tank')})  .damageIngredient(CR('super_glue'))
	
	event.shaped('create_enchantment_industry:printer', [
		' MS',
		'RHR',
		' I '
	], {M: KJ('copper_machine'), H: MC('hopper'), I: MC('iron_block'), R: 'create_enchantment_industry:experience_rotor', S: Item.of('create:super_glue').ignoreNBT()})  .damageIngredient(CR('super_glue'))
	
	copper_machine('create:copper_backtank', 1, MC("copper_block"))
	copper_machine('create:portable_fluid_interface', 2)
	copper_machine('create:fluid_tank', 1, "#forge:glass")
	copper_machine('thermal:upgrade_augment_1', 1, MC('redstone'))
	copper_machine('create:item_drain', 1, MC("iron_bars"))
	copper_machine('thermal:device_water_gen', 1, MC('bucket'))
	copper_machine('create:smart_fluid_pipe', 2)
	copper_machine('create_enchantment_industry:disenchanter', 1, "#create:sandpaper")
}

function brassMachine(event) {

	let redstoneTransmute = (input, output) => {
		event.custom({
			"type": "tconstruct:casting_basin",
			"cast": { "item": input },
			"cast_consumed": true,
			"fluid": {
				"name": "thermal:redstone",
				"amount": 50
			},
			"result": output,
			"cooling_time": 30
		})
	}

	redstoneTransmute(MC("cobblestone"), MC("netherrack"))
	redstoneTransmute(MC("sand"), MC("red_sand"))

	event.recipes.createMilling([KJ('diorite_dust')], MC('diorite')).processingTime(75)

	
	event.smoking(SP('ash'), MC('charcoal'))

	event.recipes.createMixing(Fluid.of(KJ('ash_water'), 500), [Item.of(SP('ash'), 1), Fluid.of(MC('water'), 500)])
	

	event.recipes.createMilling([KJ('impure_sky_chunks')], AE2('sky_stone_block')).processingTime(150)

	event.recipes.createMixing([KJ('clean_sky_chunks'), Fluid.of(KJ('dirt_water'), 50)], [KJ('impure_sky_chunks'), Fluid.of(KJ("ash_water"), 250)])

	event.custom({

		"type": "farmersdelight:cutting",
		"ingredients": [
			{
			"item": "kubejs:clean_sky_chunks"
			}
		],
		"tool": {
			"tag": "forge:tools/knives"
		},
		"result": [
			{
			"item": "kubejs:cut_sky_chunks",
			"count": 1
			}
		]

	})

	event.recipes.createMixing([KJ('pure_sky_chunks')], [KJ('cut_sky_chunks'), Fluid.of(MC('water'), 250), KJ('diorite_dust')])
	event.recipes.createMilling([AE2('sky_dust')], KJ('pure_sky_chunks')).processingTime(100)
	
    
	

	event.remove({ id: CR("sequenced_assembly/precision_mechanism") })
	let t = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		CR('precision_mechanism'),
	], KJ('rotation_mechanism'), [
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:precision_mechanism')

	event.shaped(KJ('brass_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('brass_casing'),
		S: CR('precision_mechanism')
	})
	event.shaped(KJ('screwdriver'), [
		'S  ',
		' SL',
		' LC'
	], {
		C: CR('andesite_alloy'),
		S: MC('iron_ingot'),
		L: TE('lead_plate')
	})

	let brass_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:brass_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:brass_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:brass_machine')
	}

	event.shaped(TE('dynamo_numismatic'), [
		' RS',
		'HMH',
		'HTH'
	], {M: KJ('brass_machine'), H: CR('brass_sheet'), R: TE('rf_coil'), S: Item.of('kubejs:screwdriver').ignoreNBT(), T: TE('silver_coin')})  .damageIngredient(KJ('screw_driver'),10)

	event.shaped(CR('mechanical_crafter', 3), [
		' RS',
		'HTH',
		' M '
	], {M: KJ('brass_machine'), H: CR('brass_sheet'), R: CR('cogwheel'), S: Item.of('kubejs:screwdriver').ignoreNBT(), T: MC('crafting_table')})  .damageIngredient(KJ('screw_driver'),10)

	event.shaped(CR('mechanical_arm'), [
		'HHT',
		'H S',
		'HMR'
	], {M: KJ('brass_machine'), H: CR('brass_sheet'), R: CR('cogwheel'), S: Item.of('kubejs:screwdriver').ignoreNBT(), T: CR('brass_hand')})  .damageIngredient(KJ('screw_driver'),10)

	

	// brass_machine('create:mechanical_crafter', 3, MC('crafting_table'))
	brass_machine('create:sequenced_gearshift', 2)
	// brass_machine('create:furnace_engine', 1)
	brass_machine('create:rotation_speed_controller', 1)
	// brass_machine('create:mechanical_arm', 1)
	brass_machine('create:stockpile_switch', 2)
	brass_machine('create:content_observer', 2)
	brass_machine('thermal:machine_press', 1, MC('dropper'))
	brass_machine('torchmaster:feral_flare_lantern', 1, MC('glowstone_dust'))
	event.remove({output: PP('item_terminal')})
	event.smithing(PP('item_terminal'),'toms_storage:ts.storage_terminal', KJ('brass_machine'))
	brass_machine(PP('pressurizer'), 1, CR('propeller'))
	brass_machine('create:brass_funnel', 4)
	brass_machine('create:brass_tunnel', 4)
	brass_machine('kubejs:pipe_module_tier_1', 4)

}

function trainMachine(event){
	event.shaped(KJ('train_mechanism'), [
		'SCS',
		'SES'
	], {
		C: KJ('pressure_mechanism'),
		S: CR('sturdy_sheet'),
		E: CR('precision_mechanism')
	})

	donutCraft(event, KJ('train_machine'), CR('railway_casing'), KJ('train_mechanism'))

	let train_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:train_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:train_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:train_machine')
	}

	train_machine(CR('track_station'), 1, MC('compass'))
	train_machine(CR('track_signal'), 1, MC('redstone_torch'))
	train_machine(CR('track_observer'), 1, MC('observer'))
	train_machine(CR('controls'), 1, CR('analog_lever'))
	train_machine('railways:track_coupler', 1, CR('minecart_coupling'))
	train_machine('railways:semaphore', 1, CR('electron_tube'))

}

function zincMachine(event) {

	// event.custom({
	// 	"type": "tconstruct:casting_basin",
	// 	"cast": {
	// 		"item": "minecraft:basalt"
	// 	},
	// 	"cast_consumed": true,
	// 	"fluid": {
	// 		"name": "minecraft:lava",
	// 		"amount": 1000
	// 	},
	// 	"result": Item.of(TE("basalz_rod"), 2),
	// 	"cooling_time": 15
	// })

	event.recipes.createFilling(TE("basalz_rod"), [MC('basalt'), Fluid.of(TC('blood'), 100)])
	event.recipes.createFilling(MC("magma_cream"), [TC('blood_slime_ball'), Fluid.of(MC('lava'), 100)])

	// event.remove({ id: TE('basalz_powder') })
	// event.remove({ id: TC('smeltery/casting/scorched/stone_from_magma') })
	event.remove({ id: TC('smeltery/casting/scorched/foundry_controller') })
	// event.remove({ id: TC('smeltery/scorched/scorched_brick_kiln') })
	// event.remove({ id: TC('smeltery/scorched/scorched_brick') })
	// event.remove({ id: TC('smeltery/melting/scorched/grout') })
	event.remove({ id: TC('smeltery/melting/soul/sand') })
	// event.recipes.createMilling([Item.of(TE('basalz_powder'), 1)], TE("basalz_rod")).processingTime(300)

	donutCraft(event, TC('foundry_controller'), TC('scorched_bricks'), KJ('scorch_mechanism'))

	event.recipes.createMixing(Fluid.of(TC("blood"), 1000), [MC('twisting_vines',1), MC('weeping_vines',3)]).heated()
    
    
	//

	let t = KJ('incomplete_scorch_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('scorch_mechanism'),
	], CR('precision_mechanism'), [
        event.recipes.createDeploying(t, [t, TC("scorched_brick")]),
        event.recipes.createDeploying(t, [t, TC("scorched_brick")]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:scorch_mechanism')

	event.shaped(KJ('zinc_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('zinc_casing'),
		S: KJ('scorch_mechanism')
	})

	let zinc_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:zinc_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:zinc_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:zinc_machine')
	}

	zinc_machine(TE('device_rock_gen'), 1, MC('piston'))
	zinc_machine(TE('device_collector'), 1, MC('ender_pearl'))
	zinc_machine(TE('device_nullifier'), 1, MC('lava_bucket'))
	zinc_machine(TE('device_potion_diffuser'), 1, MC('glass_bottle'))
	zinc_machine('storagedrawers:controller', 1, MC('diamond'))
	zinc_machine('storagedrawers:controller_slave', 1, MC('gold_ingot'))
	zinc_machine('torchmaster:megatorch', 1, MC('torch'))
	zinc_machine('thermal:upgrade_augment_2', 1, MC('redstone'))

}

function explosiveMachine(event){

	event.recipes.createMixing([CR("powdered_obsidian"), TE("sulfur")], [ Fluid.of(MC("lava"), 1000), Fluid.of(MC("water"), 1000)])
	event.remove({id: 'alloyed:mixing/steel_ingot'})

	event.recipes.createMixing([Fluid.of(BC('molten_steel'), 90)], [MC('charcoal'), Fluid.of(TC('molten_iron'), 90)]).heated()

	let t = KJ('incomplete_explosive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('explosive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createFilling(t, [t, Fluid.of(BC("molten_steel"), 100)]),
		event.recipes.createDeploying(t, [t, TE("iron_gear")]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		//.id('kubejs:explosive_mechanism')
    /*
	let t = KJ('incomplete_explosive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('explosive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createFilling  (t, [t, Fluid.of('createbigcannons:molten_steel', 100)]),
		event.recipes.createPressing (t, t),
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createDeploying(t, [t, BC("packed_gunpowder")]),
		event.recipes.createDeploying(t, [t, TE("iron_gear")])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:explosive_mechanism')
*/
		
	event.shaped(KJ('explosive_machine'), [
			'SSS',
			'SCS',
			'SSS'
		], {
		C: 'alloyed:steel_sheet_metal',
		S: KJ('explosive_mechanism')
	})

	event.recipes.createCrushing([TE('niter'), MC('sand')], MC('sandstone'))

	let explosive_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:explosive_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:explosive_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:explosive_machine')
	}
	explosive_machine('kubejs:pipe_module_tier_3', 4)
	
	explosive_machine(BC("cannon_builder"), 1, 'createbigcannons:cast_iron_block')
	explosive_machine('createbigcannons:cannon_drill', 1, TE('drill_head'))
	explosive_machine('createbigcannons:cannon_loader', 1, CR('piston_extension_pole'))
	explosive_machine(BC("impact_fuze"), 6)
	explosive_machine(BC("timed_fuze"), 6)
	explosive_machine(BC("proximity_fuze"), 6)
	explosive_machine(BC("cannon_mount"), 1, CR('mechanical_bearing'))
	explosive_machine(BC("yaw_controller"), 1, CR('turntable'))

}

function invarMachine(event) {
	event.custom({
		"type":"createaddition:charging",
		"input": {
			"item": "createbigcannons:cast_iron_ingot",
			"count": 1
		},
		"result": {
			"item": "kubejs:inductor_core",
			"count": 1
		},
		"energy": 10000
	})

	event.custom({
		"type":"createaddition:charging",
		"input": {
			"item": "kubejs:soaked_sheet",
			"count": 1
		},
		"result": {
			"item": "kubejs:rough_sheet",
			"count": 1
		},
		"energy": 4000
	})

	event.replaceInput({output: "createaddition:copper_wire"}, '#forge:plates/copper', "createaddition:copper_rod")

	event.recipes.createMilling(KJ('ceramic_powder'), MC('brick')).processingTime(50)
	
	event.remove({id: 'create:milling/dripstone_block'})
	event.recipes.createCompacting(MC('dripstone_block'), MC('clay'));

	event.recipes.createCrushing([	Item.of(MC('clay_ball')).withChance(1),
									Item.of(CR('copper_nugget')).withChance(0.65),
									Item.of(CR('copper_nugget')).withChance(0.5)]
									, MC("dripstone_block"))

	event.recipes.createCutting(KJ('mica_sheet', 3), KJ('mica_block'))

	event.recipes.createMixing([Fluid.of(KJ('electrolyte'), 1000), 'beyond_earth:desh_ingot'], [TE('sulfur_dust'), "beyond_earth:desh_ingot", Fluid.of(MC('water'), 1000)])
	
	event.recipes.createMixing([Fluid.of(KJ('plastic'), 900), 'beyond_earth:desh_ingot'], ["beyond_earth:desh_ingot", Fluid.of(TE('heavy_oil'), 500)]).heated()

	

	event.recipes.createPressing(KJ('carbon_sheet'), MC('charcoal'))

	event.recipes.createFilling(KJ('soaked_sheet'), [CR('copper_sheet'), Fluid.of(KJ('electrolyte'), 100)])

	event.remove({ output: TE('machine_frame') })

	let t = KJ('incomplete_inductor')
	event.recipes.createSequencedAssembly([
		KJ('dirt_inductor'),
	], KJ('inductor_core'), [
		event.recipes.createDeploying(t, [t, "createaddition:copper_wire"]),
		event.recipes.createDeploying(t, [t, KJ('plastic')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_wire"]),
		event.recipes.createDeploying(t, [t, KJ('plastic')]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:inductor')

	t = KJ('incomplete_resistor')

	event.recipes.createSequencedAssembly([
		KJ('dirt_resistor'),
	], KJ('plastic'), [
		event.custom(ifiniDeploying(t, t, TE('drill_head'))),
		event.recipes.createDeploying(t, [t, KJ('carbon_sheet')]),
		event.recipes.createDeploying(t, [t, KJ('carbon_sheet')]),
		event.recipes.createDeploying(t, [t, MC('clay_ball')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_rod"]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:resistor_assembly')
	t = KJ('incomplete_electrolytic_capacitor')

	event.recipes.createSequencedAssembly([
		KJ('dirt_electrolytic_capacitor'),
	], KJ('rough_sheet'), [
		event.recipes.createFilling  (t, [t, Fluid.of(MC('water'), 500)]),
		event.recipes.createFilling  (t, [t, Fluid.of(KJ('electrolyte'), 200)]),
		event.recipes.createDeploying(t, [t, CR('copper_sheet')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_rod"]),
		event.recipes.createDeploying(t, [t, KJ('plastic')]),
		event.recipes.createPressing (t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:electrolytic_capacitor_assembly')

	t = KJ('incomplete_ceramic_capacitor')
	event.recipes.createSequencedAssembly([
		KJ('dirt_ceramic_capacitor'),
	], KJ('ceramic_powder'), [
		event.recipes.createPressing(t, t),
		event.recipes.createDeploying(t, [t, CR('copper_sheet')]),
		event.recipes.createDeploying(t, [t, KJ('mica_sheet')]),
		event.recipes.createDeploying(t, [t, CR('copper_sheet')]),
		event.recipes.createDeploying(t, [t, KJ('ceramic_powder')]),
		event.recipes.createDeploying(t, [t, "createaddition:copper_rod"]),
		event.recipes.createPressing(t, t)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:resistor')


	event.recipes.createMixing([KJ('resistor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_resistor'), Fluid.of(MC('water'), 100)])
	event.recipes.createMixing([KJ('ceramic_capacitor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_ceramic_capacitor'), Fluid.of(MC('water'), 100)])
	event.recipes.createMixing([KJ('electrolytic_capacitor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_electrolytic_capacitor'), Fluid.of(MC('water'), 100)])
	event.recipes.createMixing([KJ('inductor'), Fluid.of(KJ('dirt_water'), 110)], [KJ('dirt_inductor'), Fluid.of(MC('water'), 100)])

	t = KJ('incomplete_power_mechanism')

	event.recipes.createSequencedAssembly([
		KJ('power_mechanism'),
	], KJ('explosive_mechanism'), [
		event.recipes.createFilling(t, [t, Fluid.of(KJ('plastic'), 30)]),
		event.recipes.createFilling(t, [t, Fluid.of("create_enchantment_industry:ink", 30)]),

		event.recipes.createDeploying(t, [t, KJ('electrolytic_capacitor')]),
		event.recipes.createDeploying(t, [t, KJ('ceramic_capacitor')]),
		event.recipes.createDeploying(t, [t, KJ('resistor')]),
		event.recipes.createDeploying(t, [t, KJ('inductor')]),

		event.recipes.createDeploying(t, [t, F('#soldering_irons')]),
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:power_mechanism')


	event.shaped(KJ('soldering_iron'), [
		' PW',
		' IP',
		'I  '
	], {
		P: KJ('plastic'),
		I: MC('iron_ingot'),
		W: "createaddition:copper_wire"
	})

	event.shaped(TE('machine_frame'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: 'createdeco:copper_sheet_metal',
		S: KJ('power_mechanism')
	})

	event.shaped(AE2('controller'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('fluix_casing'),
		S: KJ('power_mechanism')
	})

	let power_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), TE('machine_frame'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: TE('machine_frame'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), TE('machine_frame'))
	}

	power_machine(TE('dynamo_compression'), 1, TE('rf_coil'))
	power_machine('kubejs:pipe_module_tier_3', 4)

	event.replaceInput({ type: "minecraft:crafting_shaped", id: /ae2:.*/ }, F("#ingots/iron"), TE("lead_plate"))

	power_machine(TE('machine_crucible'), 1, 'createbigcannons:nethersteel_ingot')
	power_machine(TE('machine_furnace'), 1, 'alloyed:steel_ingot')
	power_machine(TE('machine_chiller'), 1, MC('blue_ice'))
	power_machine(TE('machine_pyrolyzer'), 1, MC('blaze_rod'))
	power_machine(TE('machine_bottler'), 1, CR('spout'))
	power_machine(TE('machine_centrifuge'), 1, MC('compass'))
	power_machine(TE('machine_refinery'), 1, '#forge:glass')
	power_machine(TE('machine_pulverizer'), 1, CR('millstone'))
	power_machine(TE('machine_smelter'), 1, MC('blast_furnace'))
	power_machine(TE('machine_sawmill'), 1, TE('saw_blade'))
	power_machine(TE('machine_brewer'), 1, MC('brewing_stand'))
	power_machine(TE('machine_insolator'), 1, FD('rich_soil'))
	power_machine(TE('machine_crystallizer'), 1, KJ('purified_certus_quartz_crystal'))
	power_machine(TE('machine_crafter'), 1, MC('crafting_table'))

	event.remove({output: "createaddition:electric_motor"})
	event.remove({output: "createaddition:alternator"})
	event.replaceInput({id: "createaddition:crafting/modular_accumulator"}, "createaddition:capacitor", KJ('electrolytic_capacitor'))
	event.replaceInput({input: "createaddition:capacitor"}, "createaddition:capacitor", KJ('ceramic_capacitor') )

	event.recipes.createMechanicalCrafting("createaddition:electric_motor", [
		' BIB ',
		'BSPSB',
		' BSB '
	], {
		S:"createaddition:copper_spool",
		B:CR('brass_sheet'),
		P:TE('machine_frame'),
		I:"createaddition:iron_rod"
	})

	event.recipes.createMechanicalCrafting("createaddition:alternator", [
		' BIB ',
		'BSPSB',
		' BSB '
	], {
		S:"createaddition:copper_spool",
		B:BC('cast_iron_ingot'),
		P:TE('machine_frame'),
		I:"createaddition:iron_rod"
	})



}

function fluixMachine(event) {

	event.remove({mod: "ae2"})
	

	let fluix_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), AE2('controller'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: AE2('controller'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), AE2('controller'))
	}

	fluix_machine(AE2('condenser'), 1, AE2("fluix_pearl"))
	fluix_machine(AE2('drive'), 1, AE2("engineering_processor"))
	fluix_machine(AE2('formation_core'), 4, AE2("logic_processor"))
	fluix_machine(AE2('annihilation_core'), 4, AE2("calculation_processor"))
	fluix_machine(AE2('chest'), 1, MC('chest'))


	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, MC("redstone"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dusts/redstone'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, MC("green_dye"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dyes/green'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, AE2("engineering_processor"), F('#dusts/glowstone'))
	event.replaceInput({ id: AE2("network/crafting/patterns_blank") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.recipes.thermal.smelter(AE2("fluix_crystal", 2), [MC("quartz"), AE2("charged_certus_quartz_crystal"), MC("redstone")]).energy(4000)

}

function enderMachine(event) {

	event.remove({ id: TE("machine/crucible/crucible_ender_pearl") })
	// event.recipes.createMixing(Fluid.of(TE("ender"), 576), [Fluid.of('tconstruct:molten_silver', 90), Fluid.of('tconstruct:ender_slime', 1000)]).heated()

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:coins/silver" },
		"result": {
			"fluid": "tconstruct:molten_silver",
			"amount": 10
		},
		"temperature": 790,
		"time": 40
	})

	event.custom({ // worth it!
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:coins/gold" },
		"result": {
			"fluid": "tconstruct:molten_gold",
			"amount": 10
		},
		"temperature": 790,
		"time": 40
	})

	// event.shaped(KJ('enderium_machine'), [
	// 	'SSS',
	// 	'SCS',
	// 	'SSS'
	// ], {
	// 	C: KJ('enderium_casing'),
	// 	S: KJ('abstruse_mechanism')
	// })

	let ender_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		// if (other_ingredient) {
		// 	event.smithing(Item.of(id, amount), 'kubejs:enderium_machine', other_ingredient)
		// 	event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:enderium_machine', B: other_ingredient })
		// }
		// else
		// 	event.stonecutting(Item.of(id, amount), 'kubejs:enderium_machine')
	}

	ender_machine("enderstorage:ender_chest", 1, MC('chest'))
	ender_machine("enderstorage:ender_tank", 2, CR('fluid_tank'))
	// ender_machine("portality:controller", 1, MC('diamond'))
	ender_machine(TE("upgrade_augment_3"), 1, MC('redstone'))
	ender_machine(AE2("quantum_ring"), 1, AE2('energy_cell'))
	ender_machine(AE2("quantum_link"), 1, AE2('fluix_pearl'))
	ender_machine('kubejs:pipe_module_tier_3', 4)

}

function circuits(event) {

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
			"item": MC('redstone')
		},
		"result": {
			"fluid": TE('redstone'),
			"amount": 100
		},
		"temperature": 300,
		"time": 10
	});

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
			"item": MC('redstone_block')
		},
		"result": {
			"fluid": TE('redstone'),
			"amount": 900
		},
		"temperature": 500,
		"time": 90
	});

	// AE2

	event.remove({ type: AE2('inscriber') })

	event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": AE2("calculation_processor_press") },
		"cast_consumed": false,
		"fluid": { "tag": "tconstruct:molten_copper", "amount": 90 },
		"result": { "item": AE2("printed_calculation_processor") },
		"cooling_time": 150
	})

	event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": AE2("logic_processor_press") },
		"cast_consumed": false,
		"fluid": { "tag": "tconstruct:molten_gold", "amount": 90 },
		"result": { "item": AE2("printed_logic_processor") },
		"cooling_time": 150
	})

	event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": AE2("engineering_processor_press") },
		"cast_consumed": false,
		"fluid": { "tag": "tconstruct:molten_diamond", "amount": 90 },
		"result": { "item": AE2("printed_engineering_processor") },
		"cooling_time": 150
	})

	event.recipes.thermal.crucible(Fluid.of(TC("molten_diamond"), 90), MC("diamond")).energy(10000)

	event.recipes.thermal.chiller(AE2("printed_calculation_processor"), [Fluid.of("tconstruct:molten_copper", 90), AE2("calculation_processor_press")]).energy(5000)
	event.recipes.thermal.chiller(AE2("printed_logic_processor"), [Fluid.of("tconstruct:molten_gold", 90), AE2("logic_processor_press")]).energy(5000)
	event.recipes.thermal.chiller(AE2("printed_engineering_processor"), [Fluid.of("tconstruct:molten_diamond", 90), AE2("engineering_processor_press")]).energy(5000)

	event.custom(ifiniDeploying(AE2("printed_silicon"), AE2("silicon"), AE2("silicon_press")))

	let types = ["calculation", "logic", "engineering"]
	types.forEach(e => {
		let t = KJ('incomplete_' + e + '_processor')
		event.recipes.createSequencedAssembly([
			AE2(e + '_processor'),
		], AE2('printed_silicon'), [
			// event.recipes.createDeploying(t, [t, KJ('')]),
			event.recipes.createFilling(t, [t, Fluid.of(TE("redstone"), 250)]),
			
			event.recipes.createPressing(t, t)
		]).transitionalItem(t)
			.loops(1)
			.id('kubejs:' + e + "_processor")
	})

	event.recipes.thermal.smelter(AE2('quartz_glass'), AE2("#dusts/quartz"))

}

function madMaths(event) {

	event.remove({ id: TE('compat/tconstruct/chiller_tconstruct_tin_ingot') })
	event.remove({ output: TE('chiller_ball_cast') })
	event.remove({ output: TE('chiller_rod_cast') })
	event.remove({ output: TE('chiller_ingot_cast') })

	event.stonecutting(TE('chiller_ball_cast'), TE('nickel_plate'))
	event.stonecutting(TE('chiller_rod_cast'), TE('nickel_plate'))
	event.stonecutting(TE('chiller_ingot_cast'), TE('nickel_plate'))

	let types = ["three", "eight", "plus", "minus", "multiply", "divide"]
	types.forEach(e => {
		event.stonecutting(KJ(e + '_cast'), TE('nickel_plate'))
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": {
				"item": KJ(e + '_cast')
			},
			"fluid": {
				"name": "kubejs:raw_logic",
				"amount": 1
			},
			"result": Item.of(KJ(e)).toResultJson(),
			"cooling_time": 10
		})
		event.custom({
			"type": "thermal:chiller",
			"ingredients": [
				Fluid.of(KJ('raw_logic'), 1).toJson(),
				Item.of(KJ(e + '_cast')).toJson()
			],
			"result": [
				Item.of(KJ(e)).toResultJson()
			],
			"energy": 100,
		})
	})

	let meltOrCrucible = (id, out, outAmount) => {
		event.recipes.thermal.crucible(Fluid.of(out, outAmount), [id]).energy(20)
		event.custom({
			"type": "tconstruct:melting",
			"ingredient": { "item": id },
			"result": {
				"fluid": out,
				"amount": outAmount
			},
			"temperature": 200,
			"time": 20
		})
	}

	let alloyAmount = 10
	let outAmount = 50
	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "kubejs:number_0", "amount": alloyAmount },
			{ "name": "kubejs:number_1", "amount": alloyAmount },
			{ "name": "kubejs:number_2", "amount": alloyAmount },
			{ "name": "kubejs:number_3", "amount": alloyAmount },
			{ "name": "kubejs:number_4", "amount": alloyAmount },
			{ "name": "kubejs:number_5", "amount": alloyAmount },
			{ "name": "kubejs:number_6", "amount": alloyAmount },
			{ "name": "kubejs:number_7", "amount": alloyAmount },
			{ "name": "kubejs:number_8", "amount": alloyAmount },
			{ "name": "kubejs:number_9", "amount": alloyAmount }
		],
		"result": {
			"fluid": "kubejs:matrix",
			"amount": outAmount
		},
		"temperature": 200
	})

	meltOrCrucible(KJ("plastic"), KJ("plastic"), 90)
	// meltOrCrucible(KJ("calculation_mechanism"), KJ("raw_logic"), 30)
	// meltOrCrucible(KJ("zero"), KJ("number_0"), 1)
	// meltOrCrucible(KJ("one"), KJ("number_1"), 1)
	// meltOrCrucible(KJ("two"), KJ("number_2"), 1)
	// meltOrCrucible(KJ("three"), KJ("number_3"), 1)
	// meltOrCrucible(KJ("four"), KJ("number_4"), 1)
	// meltOrCrucible(KJ("five"), KJ("number_5"), 1)
	// meltOrCrucible(KJ("six"), KJ("number_6"), 1)
	// meltOrCrucible(KJ("seven"), KJ("number_7"), 1)
	// meltOrCrucible(KJ("eight"), KJ("number_8"), 1)
	// meltOrCrucible(KJ("nine"), KJ("number_9"), 1)

	event.custom({
		"type": "tconstruct:casting_basin",
		"fluid": {
			"name": "kubejs:matrix",
			"amount": 1000
		},
		"result": Item.of(KJ("computation_matrix")).toResultJson(),
		"cooling_time": 20
	})

	let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
	let ops = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b, (a, b) => b == 0 ? 'error' : a / b]
	let opNames = ['plus', 'minus', 'multiply', 'divide']

	for (var a = 0; a < 10; a++) {
		for (var b = 0; b < 10; b++) {
			for (var op = 0; op < ops.length; op++) {

				let result = ops[op](a, b)
				var output;

				if (result == 'error')
					output = KJ('missingno')
				else if (result < 0)
					continue
				else if (result > 9)
					continue
				else if (result % 1 != 0)
					continue
				else
					output = KJ(nums[result])

				event.custom({
					"type": "create:mechanical_crafting",
					"pattern": [
						"AOB"
					],
					"key": {
						"A": {
							"item": KJ(nums[a])
						},
						"O": {
							"item": KJ(opNames[op])
						},
						"B": {
							"item": KJ(nums[b])
						}
					},
					"result": {
						"item": output
					},
					"acceptMirrored": false
				})

			}
		}
	}

}

function glitch(event) {


}

function alchemy(event) {

	event.recipes.thermal.pyrolyzer([MC("charcoal", 2), Fluid.of(TE('creosote'), 50)], MC("#logs")).energy(1000)
	event.recipes.thermal.pyrolyzer([TE("coal_coke"), Fluid.of(TE('creosote'), 50)], MC("charcoal")).energy(2000)
	let t = KJ('incomplete_coke_chunk')
	event.recipes.createSequencedAssembly([
		KJ('coke_chunk'),
	], TE('coal_coke'), [
		event.recipes.createFilling(t, [t, Fluid.of(MC("water"), 250)]),
		event.recipes.createCutting(t, t).processingTime(100)
	]).transitionalItem(t)
		.loops(2)
		.id('kubejs:coke_cutting')

	event.recipes.createSplashing([
		Item.of(KJ("sand_ball")).withChance(0.125)
	], 'minecraft:sandstone')
	event.recipes.thermal.bottler(KJ("sand_ball"), [Fluid.of(MC("water"), 50), F("#sand/colorless")]).energy(1000)
	/**/// event.recipes.thermal.chiller(KJ("creosote_pellet"), [Fluid.of(TE("creosote"), 50)]).energy(1000)
	/**/// event.recipes.thermal.crucible(Fluid.of(KJ("liquid_smoke"), 250), KJ("creosote_pellet")).energy(3000)
	/**/// event.remove({ id: TE("blitz_powder") })
	/**/// event.recipes.createPressing(TE("lightning_charge"), TE("blitz_powder"))
	event.remove({ output: TE("basalz_powder") })
	event.remove({ output: TE("blizz_powder") })

	event.custom({
		"type": "thermal:pulverizer",
		"ingredient": { "item": "thermal:basalz_rod" },
		"energy": 800,
		"result": [
			{ "item": "thermal:basalz_powder", "chance": 2.5 },
			{ "item": "thermal:slag", "chance": 0.125 }
		]
	})

	event.custom({
		"type": "thermal:pulverizer",
		"ingredient": { "item": "thermal:blizz_rod" },
		"energy": 800,
		"result": [
			{ "item": "thermal:blizz_powder", "chance": 2.5 },
			{ "item": "thermal:niter", "chance": 0.125 }
		]
	})

	event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), F("#sand")).energy(6000)
	event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), F("#glass/colorless")).energy(3000)
	event.recipes.thermal.pulverizer([CR("powdered_obsidian")], F("#obsidian")).energy(7000)

	let blizz = TE("blizz_powder")
	let basalz = TE("basalz_powder")
	event.recipes.createEmptying([KJ("rough_sand"), Fluid.of(KJ("fine_sand"), 500)], KJ("sand_ball"))
	event.recipes.createCrushing([Item.of(blizz, 1), Item.of(blizz, 1).withChance(.5)], TE("blizz_rod"))
	event.recipes.createCrushing([Item.of(basalz, 1), Item.of(basalz, 1).withChance(.5)], TE("basalz_rod"))
	event.recipes.createCompacting(TE("ice_charge"), [blizz, blizz, blizz, blizz, blizz, blizz, blizz, blizz])
	event.recipes.createCompacting(TE("earth_charge"), [basalz, basalz, basalz, basalz, basalz, basalz, basalz, basalz])

	event.recipes.createCompacting(KJ("silicon_compound"), [Fluid.of(KJ("fine_sand"), 500), KJ("purified_sand"), KJ("coke_chunk")])
	// event.recipes.createCompacting(KJ("smoke_mote"), [Fluid.of(KJ("liquid_smoke"), 500)])

	// event.remove({ output: "desolation:activatedcharcoal" })
	// event.recipes.thermal.smelter(
	// 	["desolation:activatedcharcoal"],
	// 	[KJ("coke_chunk"), TE("lightning_charge")])
	// 	.energy(10000)

	event.recipes.thermal.smelter(
		[KJ("purified_sand")],
		[KJ("rough_sand"), TE("earth_charge")])
		.energy(5000)

	event.recipes.thermal.smelter(
		[AE2("silicon")],
		[KJ("silicon_compound"), TE("ice_charge")])
		.energy(5000)

	event.recipes.thermal.numismatic_fuel(TE('silver_coin')).energy(100000)
	event.recipes.thermal.numismatic_fuel(TE('gold_coin')).energy(6400000)

	event.remove({ id: TE("machine/pyrolyzer/pyrolyzer_logs") })
	event.remove({ id: CR("crushing/obsidian") })
	event.remove({ type: TE("sawmill") })
	event.remove({ type: TE("centrifuge") })
	event.remove({ output: AE2("silicon") })

	let alchemy_mix = (output, catalyst, r1, r2, amount) => {
		event.recipes.createMixing([Item.of(KJ("substrate_" + output, amount ? amount : 1)), KJ("substrate_" + catalyst)], [KJ("substrate_" + catalyst), KJ("substrate_" + r1, 2), KJ("substrate_" + r2)]).heated()
	}

	let alchemy_smelt = (output, catalyst, r1, r2, amount) => {
		event.recipes.thermal.smelter([Item.of(KJ("substrate_" + output, amount ? amount : 1)), KJ("substrate_" + catalyst)], [KJ("substrate_" + r1, 2), KJ("substrate_" + catalyst), KJ("substrate_" + r2)]).energy(4000)
	}

	alchemy_mix("red", "herbal", "diorite", "andesite")
	alchemy_mix("orange", "herbal", "granite", "diorite")
	alchemy_mix("yellow", "herbal", "cobblestone", "granite")
	alchemy_mix("green", "herbal", "basalt", "cobblestone")
	alchemy_mix("blue", "herbal", "tuff", "basalt")
	alchemy_mix("magenta", "herbal", "andesite", "tuff")

	alchemy_smelt("nether", "volatile", "red", "tuff")
	alchemy_smelt("blaze", "volatile", "orange", "andesite")
	alchemy_smelt("gunpowder", "volatile", "yellow", "diorite")
	alchemy_smelt("slime", "volatile", "green", "granite")
	alchemy_smelt("prismarine", "volatile", "blue", "cobblestone")
	alchemy_smelt("obsidian", "volatile", "magenta", "basalt")

	alchemy_mix("arcane", "crystal", "nether", "magenta")
	alchemy_mix("niter", "crystal", "blaze", "red")
	alchemy_mix("quartz", "crystal", "gunpowder", "orange")
	alchemy_mix("sulfur", "crystal", "slime", "yellow")
	alchemy_mix("apatite", "crystal", "prismarine", "green")
	alchemy_mix("certus", "crystal", "obsidian", "blue")

	alchemy_smelt("lead", "metal", "arcane", "obsidian")
	alchemy_smelt("copper", "metal", "niter", "nether")
	alchemy_smelt("gold", "metal", "quartz", "blaze")
	alchemy_smelt("nickel", "metal", "sulfur", "gunpowder")
	alchemy_smelt("zinc", "metal", "apatite", "slime")
	alchemy_smelt("iron", "metal", "certus", "prismarine")

	alchemy_mix("emerald", "gem", "lead", "certus")
	alchemy_mix("sapphire", "gem", "copper", "arcane")
	alchemy_mix("diamond", "gem", "gold", "niter")
	alchemy_mix("lapis", "gem", "nickel", "quartz")
	alchemy_mix("ruby", "gem", "zinc", "sulfur")
	alchemy_mix("cinnabar", "gem", "iron", "apatite")

	alchemy_smelt("andesite", "igneous", "emerald", "iron", 20)
	alchemy_smelt("diorite", "igneous", "sapphire", "lead", 20)
	alchemy_smelt("granite", "igneous", "diamond", "copper", 20)
	alchemy_smelt("cobblestone", "igneous", "lapis", "gold", 20)
	alchemy_smelt("basalt", "igneous", "ruby", "nickel", 20)
	alchemy_smelt("tuff", "igneous", "cinnabar", "zinc", 20)

	let mundane = (id, outputs) => {
		let jsonOut = []
		if (outputs[0] > 0)
			jsonOut.push({
				"item": "supplementaries:ash",
				"count": outputs[0]
			})
		if (outputs[1] > 0)
			jsonOut.push({
				"item": MC("redstone"),
				"count": outputs[1]
			})
		if (outputs[2] > 0)
			jsonOut.push({
				"item": MC("glowstone_dust"),
				"count": outputs[2]
			})
		event.custom({
			"type": "thermal:centrifuge",
			"ingredient": {
				"item": KJ(`failed_alchemy_${id}`)
			},
			"result": jsonOut
		})
	}

	let i = 0;

	mundane(i++, [4, 0, 0])
	mundane(i++, [3, 1, 0])
	mundane(i++, [3, 0, 1])
	mundane(i++, [2, 2, 0])
	mundane(i++, [2, 0, 2])

	mundane(i++, [2, 1, 1])
	mundane(i++, [1, 3, 0])
	mundane(i++, [1, 0, 3])
	mundane(i++, [1, 2, 1])
	mundane(i++, [1, 1, 2])

	mundane(i++, [0, 4, 0])
	mundane(i++, [0, 0, 4])
	mundane(i++, [0, 3, 1])
	mundane(i++, [0, 1, 3])
	mundane(i++, [0, 2, 2])

	let recompact = (id, id2) => {
		event.recipes.createCompacting(id2, [id])
	}

	event.recipes.createCrushing(CR("powdered_obsidian"), MC("obsidian"))

	recompact(CR("powdered_obsidian"), MC("obsidian"))
	recompact(TE("diamond_dust"), MC("diamond"))
	recompact(TE("emerald_dust"), MC("emerald"))
	recompact(TE("lapis_dust"), MC("lapis_lazuli"))
	recompact(TE("sulfur_dust"), TE("sulfur"))
	recompact(TE("apatite_dust"), TE("apatite"))
	recompact(TE("niter_dust"), TE("niter"))
	recompact(TE("sapphire_dust"), TE("sapphire"))
	recompact(TE("ruby_dust"), TE("ruby"))
	recompact("forbidden_arcanus:arcane_crystal_dust", "forbidden_arcanus:arcane_crystal")

	// global.substrates.forEach(a => {
	// 	a.forEach(e => {
	// 		if (!e.ingredient)
	// 			return

	// 		event.custom({
	// 			"type": "thermal:bottler",
	// 			"ingredients": [Ingredient.of(e.ingredient).toJson(), { "fluid": "tconstruct:molten_glass", "amount": 100 }],
	// 			"result": [{ "item": e.id }]
	// 		})
	// 		event.custom({
	// 			"type": "thermal:sawmill",
	// 			"ingredient": { "item": e.id },
	// 			"result": [{ "item": e.outputItem ? e.outputItem : typeof e.ingredient == "string" ? e.ingredient : e.ingredient[0], "chance": 0.75 }],
	// 			"energy": 2000
	// 		})
	// 	})
	// })

	// event.custom({
	// 	"type": "thermal:sawmill",
	// 	"ingredient": { "item": "kubejs:substrate_silicon" },
	// 	"result": [{ "item": AE2("silicon"), "count": 1 }],
	// 	"energy": 2000
	// })
	// event.custom({
	// 	"type": "thermal:sawmill",
	// 	"ingredient": { "item": "kubejs:substrate_silver" },
	// 	"result": [{ "item": TE("silver_dust"), "count": 1 }],
	// 	"energy": 2000
	// })

	// event.custom({
	// 	"type": "thermal:bottler",
	// 	"ingredients": [
	// 		{ "item": TE("signalum_nugget") },
	// 		{ "fluid": "tconstruct:molten_glass", "amount": 100 }
	// 	],
	// 	"result": [{ "item": "kubejs:accellerator_redstone" }]
	// })

	// event.custom({
	// 	"type": "thermal:bottler",
	// 	"ingredients": [
	// 		{ "item": TE("silver_dust") },
	// 		{ "fluid": "tconstruct:molten_glass", "amount": 100 }
	// 	],
	// 	"result": [{ "item": "kubejs:substrate_silver" }]
	// })

	// event.custom({
	// 	"type": "thermal:bottler",
	// 	"ingredients": [
	// 		{ "item": TE("lumium_nugget") },
	// 		{ "fluid": "tconstruct:molten_glass", "amount": 100 }
	// 	],
	// 	"result": [{ "item": "kubejs:accellerator_glowstone" }]
	// })

}

function trading(event) {
	let trade = (card_id, ingredient, output) => {
		event.recipes.thermal.press(output, [ingredient, card_id]).energy(1000)
	}

	global.trades.forEach(element => {
		if (global.transactions[element])
			global.transactions[element].forEach(transaction => {
				console.log(element)
				trade(KJ('trade_card_' + element), transaction.in, transaction.out)
			})
	});

	global.professions.forEach(element => {
		if (global.transactions[element])
			global.transactions[element].forEach(transaction => {
				console.log(transaction.in)
				trade(KJ('profession_card_' + element), transaction.in, transaction.out)
			})
	});
}




