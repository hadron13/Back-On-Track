// priority: 0

onEvent('item.registry', event => {

	event.create('purified_certus_quartz_crystal').texture("kubejs:item/purified_certus_quartz_crystal").displayName("Pure Certus Quartz Crystal")
	event.create('purified_fluix_crystal').texture("kubejs:item/purified_fluix_crystal").displayName("Pure Fluix Crystal")

	event.create('rose_quartz_seed').texture("ae2:item/crystal_seed_certus").displayName("Rose Quartz Seed").color(0, "#ff8e8a")

	let types = [/*'Nether',*/ 'Certus', 'Fluix']
	types.forEach(e => {
		let id = e.toLowerCase()
		event.create('growing_' + id + '_seed', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id).displayName(e + ' Quartz Seed')
		event.create('tiny_' + id + '_crystal').texture("ae2:item/crystal_seed_" + id + "2").displayName('Tiny ' + e + ' Quartz Crystal')
		event.create('growing_tiny_' + id + '_crystal', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id + "2").displayName('Tiny ' + e + ' Quartz Crystal')
		event.create('small_' + id + '_crystal').texture("ae2:item/crystal_seed_" + id + "3").displayName('Small ' + e + ' Quartz Crystal')		
		event.create('growing_small_' + id + '_crystal', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id + "3").displayName('Small ' + e + ' Quartz Crystal')
	
	});

	event.create('growing_rose_seed', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_certus").displayName('Rose Quartz Seed').color(0, "#ff8e8a")
	event.create('tiny_rose_crystal').texture("ae2:item/crystal_seed_certus2").displayName('Tiny Rose Quartz Crystal').color(0, "#ff8e8a")
	event.create('growing_tiny_rose_crystal', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_certus" + "2").displayName('Tiny Rose Quartz Crystal').color(0, "#ff8e8a")
	event.create('small_rose_crystal').texture("ae2:item/crystal_seed_certus3").displayName('Small Rose Quartz Crystal').color(0, "#ff8e8a")
	event.create('growing_small_rose_crystal', 'create:sequenced_assembly').texture("ae2:item/crystal_seed_certus" + "3").displayName('Small Rose Quartz Crystal').color(0, "#ff8e8a")


	let processors = ["Calculation", "Logic", "Engineering"]
	processors.forEach(name => {
		let e = name.toLowerCase()
		event.create('incomplete_' + e + '_processor', 'create:sequenced_assembly').texture('kubejs:item/incomplete_' + e + '_processor').displayName('Incomplete ' + name + ' Processor')
	})

	let mechanism = (name, rarity) => {
		let id = name.toLowerCase()
		event.create(id + '_mechanism').texture("kubejs:item/" + id + "_mechanism").displayName(name + ' Mechanism').rarity(rarity ? rarity : RARITY_COMMON)
		event.create('incomplete_' + id + '_mechanism', 'create:sequenced_assembly').texture("kubejs:item/incomplete_" + id + "_mechanism").displayName('Incomplete ' + name + ' Mechanism')
	}

	mechanism('Rotation')
	mechanism('Pressure')
	mechanism('Train')
	mechanism('Scorch', RARITY_UNCOMMON)
	mechanism('Explosive', RARITY_UNCOMMON)
	mechanism('Power', RARITY_UNCOMMON)



	// Misc / Integration
	event.create('pipe_module_utility').texture("kubejs:item/pipe_module_utility").displayName('Utility Pipe Module')
	event.create('pipe_module_tier_1').texture("kubejs:item/pipe_module_tier_1").displayName('Brass Pipe Module')
	event.create('pipe_module_tier_2').texture("kubejs:item/pipe_module_tier_2").displayName('Invar Pipe Module')
	event.create('pipe_module_tier_3').texture("kubejs:item/pipe_module_tier_3").displayName('Enderium Pipe Module')
	
	event.create('incomplete_steel_engine', 'create:sequenced_assembly').texture("kubejs:item/incomplete_engine_t1").displayName('Incomplete Brass Engine')
	event.create('failed_steel_engine').texture("kubejs:item/failed_engine_t1").displayName('Failed Brass Engine')

	event.create('circuit_scrap').texture("kubejs:item/circuit_scrap").displayName('Circuit Scrap')
	event.create('zinc_dust').texture("kubejs:item/zinc_dust").displayName('Zinc Dust')

	event.create('asurine_bits').texture("kubejs:item/asurine_bits").displayName('Asurine Chunks')
	event.create('andesite_blend').texture("kubejs:item/andesite_blend").displayName('Andesitic Blend')
	event.create('andesite_dust').texture("kubejs:item/andesite_dust").displayName('Andesite Dust')

	
	event.create('impure_sky_chunks').texture("kubejs:item/impure_sky_chunks").displayName('Impure Sky Chunks')
	event.create('clean_sky_chunks').texture("kubejs:item/clean_sky_chunks").displayName('Clean Sky Chunks')
	event.create('cut_sky_chunks').texture("kubejs:item/clean_sky_pellet").displayName('Clean Sky Pellet')
	event.create('pure_sky_chunks').texture("kubejs:item/pure_sky_pellet").displayName('Pure Sky Pellet')

	event.create('diorite_dust').texture("kubejs:item/diorite_dust").displayName('Diorite Dust')
	

	event.create('soaked_sheet').texture("kubejs:item/soaked_sheet").displayName('Soaked Copper Sheet')
	event.create('rough_sheet').texture("kubejs:item/rough_sheet").displayName('Rough Copper Sheet')

	event.create('resistor').texture("kubejs:item/resistor").displayName('Resistor')
	event.create('inductor').texture("kubejs:item/inductor").displayName('Induction Coil')
	event.create('ceramic_capacitor').texture("kubejs:item/capacitor_ceramic").displayName('Ceramic Capacitor')
	event.create('electrolytic_capacitor').texture("kubejs:item/capacitor_electrolytic").displayName('Electrolytic Capacitor')

	event.create('dirt_resistor').texture("kubejs:item/resistor_dirt").displayName('Dirty Resistor')
	event.create('dirt_inductor').texture("kubejs:item/inductor_dirt").displayName('Dirty Induction Coil')
	event.create('dirt_ceramic_capacitor').texture("kubejs:item/capacitor_ceramic_dirt").displayName('Dirty Ceramic Capacitor')
	event.create('dirt_electrolytic_capacitor').texture("kubejs:item/capacitor_electrolytic_dirt").displayName('Dirty Electrolytic Capacitor')

	event.create('incomplete_resistor', 'create:sequenced_assembly').texture("kubejs:item/resistor_incomplete").displayName('Incomplete Resistor')
	event.create('incomplete_inductor', 'create:sequenced_assembly').texture("kubejs:item/inductor_incomplete").displayName('Incomplete Induction Coil')
	event.create('incomplete_ceramic_capacitor', 'create:sequenced_assembly').texture("kubejs:item/capacitor_ceramic_incomplete").displayName('Incomplete Ceramic Capacitor')
	event.create('incomplete_electrolytic_capacitor', 'create:sequenced_assembly').texture("kubejs:item/capacitor_electrolytic_incomplete").displayName('Incomplete Electrolytic Capacitor')

	event.create('inductor_core').texture("kubejs:item/inductor_core").displayName('Magnetic Core')

	event.create('carbon_sheet').texture("kubejs:item/carbon_sheet").displayName('Carbon Sheet')
	event.create('mica_sheet').texture("kubejs:item/mica_sheet").displayName('Mica Sheet')
	event.create('ceramic_powder').texture("kubejs:item/ceramic_powder").displayName('Ceramic Powder')

	event.create('plastic').texture("kubejs:item/plastic").displayName('Plastic')
	event.create('nickel_compound').texture("kubejs:item/nickel_compound").displayName('Nickel Compound')
	// event.create('invar_compound').texture("kubejs:item/invar_compound").type('create:sequenced_assembly').displayName('Unprocessed Invar Ingot')
	event.create('invar_compound', 'create:sequenced_assembly').texture("kubejs:item/invar_compound").displayName('Unprocessed Invar Ingot')
	event.create('dye_entangled_singularity').texture("kubejs:item/dye_entangled_singularity").unstackable().displayName('Chromatic Singularity')

	event.create('stone_saw').texture("kubejs:item/stone_saw").displayName('Stone Saw').maxDamage(128)
	event.create('iron_saw').texture("kubejs:item/iron_saw").displayName('Iron Saw').maxDamage(256)
	event.create('diamond_saw').texture("kubejs:item/diamond_saw").displayName('Diamond Saw').maxDamage(1024)
	event.create('screwdriver').texture("kubejs:item/screwdriver").displayName('Screwdriver').maxDamage(512)
	event.create('soldering_iron').texture("kubejs:item/soldering_iron").displayName('Soldering Iron').maxDamage(1024)

	event.create('golden_tube').texture("kubejs:item/yellow_tube").displayName("Golden Tube")
	event.create('diamond_tube').texture("kubejs:item/blue_tube").displayName("Diamond Tube")
	event.create('empty_tube').texture("kubejs:item/empty_tube").displayName("Empty Tube")


	// event.create('alchemical_laser').parentModel("kubejs:block/ponder_laser_lamp_on").displayName('Alchemical Laser (Ponder Entry)').unstackable()
	event.create('thermal_cast').texture("kubejs:item/thermal_cast").displayName('Thermal Cast').unstackable()

	// event.create('computation_matrix').parentModel("kubejs:item/computation_matrix").displayName('Computation Matrix').rarity(RARITY_UNCOMMON).unstackable()

	event.create('thing').texture("kubejs:images/thing")
	
})

onEvent('block.registry', event => {
	event.create('enderium_casing').model('kubejs:block/enderium_casing').material('metal').hardness(4.0).displayName('Ender Casing')
	event.create('zinc_casing').material('metal').hardness(3.0).displayName('Zinc Casing')
	event.create('invar_casing').material('metal').hardness(3.0).displayName('Invar Casing')
	event.create('fluix_casing').material('metal').hardness(3.0).displayName('Fluix Casing')

	event.create('mica_block').material('metal').hardness(3.0).displayName('Mica Block')

	let machine = (name, display, layer) => {
		let id = name.toLowerCase()
		event.create(id + '_machine')
			.model('kubejs:block/' + id + '_machine')
			.material('lantern')
			.hardness(3.0)
			.displayName(display + ' Machine')
			.notSolid()
			.renderType(layer)
	}

	machine('Andesite', 'Rotation', "solid")
	machine('Brass', 'Precision',"translucent")
	machine('Copper', 'Pressure', "cutout")
	machine('Zinc', 'Scorch',"cutout")
	machine('Train', 'Track', "cutout")
	machine('Explosive', 'Explosive', "solid")
	machine('Enderium', 'Abstruse',"cutout")

	for (let i = 0; i < 15; i++)
		event.create(`failed_alchemy_${i}`)
			.material('glass')
			.color(0, 0x394867)
			.color(1, 0x14274E)
			.hardness(0.1)
			.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
			.model("kubejs:block/mundane_substrate")
			.displayName(`Mundane Alchemic Blend`)
			.renderType("cutout")

	global.substrates = []
	global.substrate_mapping = {}
	var current_category = []
	var category_index = 0
	var substrate_index = 0

	let category = () => {
		global.substrates.push(current_category)
		current_category = []
		category_index++
		substrate_index = 0
	}

	let substrate_base = (c1, c2, id, name, model, ingredient, outputItem) => {
		global.substrate_mapping[id] = {
			category: category_index,
			index: substrate_index,
			name: name.replace(" Reagent", "").replace(" Catalyst", "")
		}
		current_category.push({
			id: `kubejs:substrate_${id}`,
			ingredient: ingredient,
			outputItem: outputItem
		})
		event.create(`substrate_${id}`)
			.material('glass')
			.color(0, c1)
			.color(1, c2)
			.hardness(0.1)
			.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
			.model("kubejs:block/" + model)
			.displayName(name)
			.renderType("cutout")
			.item(e => e.rarity(model == "catalyst" ? RARITY_UNCOMMON : RARITY_COMMON)
						.color(0, c1)
						.color(1, c2))
		substrate_index++
	}

	let reagent = (c1, c2, id, prefix, ingredient, outputItem) => substrate_base(c1, c2, id, `${prefix} Reagent`, "substrate", ingredient, outputItem)
	let catalyst = (c1, c2, id, prefix, ingredient) => substrate_base(c1, c2, id, `${prefix} Catalyst`, "catalyst", ingredient)

	reagent(0x5F5F5F, 0x8E8E8E, "andesite", "Andesite", "create:andesite_cobblestone")
	reagent(0x7F7F7F, 0xD4D4D4, "diorite", "Diorite", "create:diorite_cobblestone")
	reagent(0x563A2F, 0x9A6C5B, "granite", "Granite", "create:granite_cobblestone")
	reagent(0x585858, 0x646363, "cobblestone", "Stone", "minecraft:cobblestone")
	reagent(0x32333D, 0x5C5C5C, "basalt", "Basalt", "minecraft:basalt")
	reagent(0x6B5D4F, 0x7D6B5A, "tuff", "Tuff", "minecraft:tuff")
	category()
	reagent(0xD30000, 0xB80F0A, "red", "Crimson", ["minecraft:rose_bush", "minecraft:poppy", "minecraft:red_tulip"], "minecraft:red_dye")
	reagent(0xFC6600, 0xb1560f, "orange", "Orange", ["minecraft:orange_tulip", "biomesoplenty:burning_blossom", "minecraft:pumpkin"], "minecraft:orange_dye")
	reagent(0xFFF200, 0xdba520, "yellow", "Goldenrod", ["biomesoplenty:goldenrod", "minecraft:sunflower", "minecraft:dandelion"], "minecraft:yellow_dye")
	reagent(0x9dc183, 0x708238, "green", "Olive", ["minecraft:fern", "minecraft:cactus", "biomesoplenty:watergrass"], "minecraft:green_dye")
	reagent(0x57a0d2, 0x0080fe, "blue", "Azure", ["biomesoplenty:blue_hydrangea", "minecraft:cornflower", "minecraft:blue_orchid"], "minecraft:light_blue_dye")
	reagent(0xb200ed, 0xff66cc, "magenta", "Fuchsia", ["minecraft:lilac", "minecraft:allium", "minecraft:pink_tulip"], "minecraft:magenta_dye")
	category()
	reagent(0xAC3B00, 0xD5AC26, "blaze", "Blazing", "minecraft:blaze_powder")
	reagent(0x4F7E48, 0x8AD480, "slime", "Slime", "minecraft:slime_ball")
	reagent(0x5B151A, 0xBC3E49, "nether", "Nether", "minecraft:nether_wart")
	reagent(0x05030A, 0x36234C, "obsidian", "Obsidian", "create:powdered_obsidian")
	reagent(0x535353, 0x717171, "gunpowder", "Gunpowder", "minecraft:gunpowder")
	reagent(0x529680, 0xA2CFC0, "prismarine", "Aquatic", "minecraft:prismarine_shard")
	category()
	reagent(0x9E72BE, 0xB7C9D1, "arcane", "Arcane", "forbidden_arcanus:arcane_crystal_dust")
	reagent(0x27A9BB, 0x2CC7C9, "apatite", "Apatite", "thermal:apatite_dust")
	reagent(0xC7A94A, 0xEEF071, "sulfur", "Sulfuric", "thermal:sulfur_dust")
	reagent(0x735A65, 0xB8AFAF, "niter", "Nitric", "thermal:niter_dust")
	reagent(0x91C5FC, 0xA7CBCF, "certus", "Certus Quartz", "ae2:certus_quartz_dust")
	reagent(0xB19E8F, 0xE7E2DB, "quartz", "Nether Quartz", "ae2:nether_quartz_dust")
	category()
	reagent(0x616A60, 0xD0D2C5, "zinc", "Zinc", "kubejs:zinc_dust")
	reagent(0xDD7E5D, 0xFCEFBA, "copper", "Copper", "thermal:copper_dust")
	reagent(0xA6A6A6, 0xD5D5D5, "iron", "Iron", "thermal:iron_dust")
	reagent(0x977756, 0xE4D196, "nickel", "Nickel", "thermal:nickel_dust")
	reagent(0x232456, 0x7C95A4, "lead", "Lead", "thermal:lead_dust")
	reagent(0xD99413, 0xFAF25E, "gold", "Gold", "thermal:gold_dust")
	category()
	reagent(0xFC7781, 0xFCCED0, "cinnabar", "Cinnabar", "thermal:cinnabar")
	reagent(0x335DC1, 0x7395E7, "lapis", "Lapis Lazuli", "thermal:lapis_dust")
	reagent(0x246BE9, 0x76C6FC, "sapphire", "Sapphire", "thermal:sapphire_dust")
	reagent(0x00A82B, 0xADFACB, "emerald", "Emerald", "thermal:emerald_dust")
	reagent(0x9D0A33, 0xFB7B71, "ruby", "Ruby", "thermal:ruby_dust")
	reagent(0x20C3B3, 0xD2FCF3, "diamond", "Diamond", "thermal:diamond_dust")
	category()
	catalyst(0x506D84, 0x889EAF, "igneous", "Igneous")
	catalyst(0xB5CDA3, 0xC9E4C5, "herbal", "Herbal")
	catalyst(0x9F5F80, 0xFF8474, "volatile", "Volatile")
	catalyst(0xFFB037, 0xFFE268, "crystal", "Crystalline")
	catalyst(0x232457, 0x7D97A6, "metal", "Metallurgic")
	catalyst(0x3EDBF0, 0xC0FEFC, "gem", "Gemstone")
	category()

	event.create(`substrate_chaos`)
		.material('glass')
		.hardness(0.1)
		.color(0, 0xb200ed)
		.color(1, 0xff66cc)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("kubejs:block/chaos_catalyst")
		.displayName("Chaos Catalyst")
		.renderType("cutout")
		.item(e => e.rarity(RARITY_RARE).color(0, 0xb200ed).color(1, 0xff66cc))

	event.create(`substrate_silicon`)
		.material('glass')
		.color(0, 0x474449)
		.color(1, 0x967DA0)
		.hardness(0.1)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("kubejs:block/substrate")
		.displayName("Silicon Reagent")
		.renderType("cutout")
		.item(e => e.rarity(RARITY_EPIC).color(0, 0x474449).color(1, 0x967DA0))


	event.create(`substrate_silver`)
		.material('glass')
		.color(0, 0x9FADB4)
		.color(1, 0xBECCD2)
		.hardness(0.1)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("kubejs:block/substrate")
		.displayName("Silver Reagent")
		.renderType("cutout")
		.item(e => e.color(0, 0x9FADB4).color(1, 0xBECCD2))

	event.create(`accellerator_glowstone`)
		.material('glass')
		.color(0, 0xFFBC5E)
		.hardness(0.1)
		.box(.125, 0, .125, .875, 10.0 / 16.0, .875, false)
		.model("kubejs:block/accellerator")
		.displayName("Glowstone Accelerator")
		.renderType("cutout")
		.item(e => e.color(0, 0xFFBC5E))
	event.create(`accellerator_redstone`)
		.material('glass')
		.color(0, 0xAA0F01)
		.hardness(0.1)
		.box(.125, 0, .125, .875, 10.0 / 16.0, .875, false)
		.model("kubejs:block/accellerator")
		.displayName("Redstone Accelerator")
		.renderType("cutout")
		.item(e => e.color(0, 0xAA0F01))

})

onEvent('fluid.registry', event => {
	let colors = [0xCBE827, 0xAEE827, 0x68E827, 0x27E86E, 0x27E8B1, 0x27DEE8, 0x27B5E8, 0x2798E8, 0x2778E8, 0x2748E8]
	event.create('raw_logic').displayName(`Liquified Logic (Unprocessed)`).stillTexture('kubejs:fluid/number_still').flowingTexture('kubejs:fluid/number_flow').color(0xE7FFCB)
	for (let i = 0; i < 10; i++)
		event.create('number_' + i).displayName(`Liquified Logic (${i})`).stillTexture('kubejs:fluid/number_still').flowingTexture('kubejs:fluid/number_flow').color(colors[i])
	event.create('matrix').displayName(`Liquified Computation Matrix`).stillTexture('kubejs:fluid/matrix_still').flowingTexture('kubejs:fluid/matrix_flow').bucketColor(colors[0])
	event.create('fine_sand').displayName(`Fine Sand`).stillTexture('kubejs:fluid/fine_sand_still').flowingTexture('kubejs:fluid/fine_sand_flow').bucketColor(0xE3DBB0)
	
	event	.create('crude_oil')
			.displayName(`Crude Oil`)
			.stillTexture('thermal:block/fluids/crude_oil_still')
			.flowingTexture('thermal:block/fluids/crude_oil_flow')
			.bucketColor(0x222118)
			.viscosity(100000)

	event.create('ash_water')
			.thickTexture(0xa5afaf)
			.bucketColor(0xa5afaf)
			.displayName('Ash Mix')



	event.create('dirt_water')
			.thinTexture(0xc18551)
			.bucketColor(0xc18551)
			.displayName('Dirty Water')

	event.create('gas')
			.thinTexture(0xaec1c1)
			.displayName('Gas')
			.noBucket()

	event.create('electrolyte')
			.thinTexture(0xd6d842)
			.bucketColor(0xd6d842)
			.displayName('Electrolyte')

	event.create('plastic')
			.thinTexture(0xd8d8d5)
			.bucketColor(0xd8d8d5)
			.displayName('Liquid Plastic')
			
			  
	// event.create('liquid_smoke').displayName(`Liquid Smoke`).stillTexture('advancedrocketry:blocks/fluid/oxygen_still').flowingTexture('advancedrocketry:blocks/fluid/oxygen_flow').bucketColor(0xEBEBEB)
})

onEvent('item.modification', event => {
	event.modify('beyond_earth:hammer', item => {item.maxDamage = 50})
	
	let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
	colors.forEach(element => {
		event.modify('ae2:' + element + '_paint_ball', item => {
			item.maxStackSize = 1
		})
	});
})
