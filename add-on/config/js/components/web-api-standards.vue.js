(function () {
    "use strict";

    const standardsDefaults = window.WEB_API_MANAGER.defaults;
    const Vue = window.Vue;

    Vue.component("web-api-standards", {
        props: ["standards", "selectedStandards", "selectedDomain"],
        template: `
            <div class="web-api-standards-container">
                <h3>Pattern: <code>{{ selectedDomain }}</code></h3>

                <div class="panel panel-default form-horizontal">
                    <div class="panel-heading">
                        Default configurations
                    </div>

                    <div class="panel-body">
                        <button @click="onLiteClicked">
                            Use Lite Settings
                        </button>
                        <button @click="onConservativeClicked">
                            Use Conservative Settings
                        </button>
                        <button @click="onAggressiveClicked">
                            Use Aggressive Settings
                        </button>
                        <button @click="onClearClicked">
                            Clear Settings
                        </button>
                        <button @click="onAllClicked">
                            Block All
                        </button>
                    </div>

                    <div class="panel-footer">
                        <strong>Lite</strong> is designed to have a minimal
                        impact on typical browsing while still providing
                        security and privacy improvements.
                        <strong>Conservative</strong> and <strong>Aggressive</strong>
                        provide extra protections, though will impact the
                        functionaltiy more sites.
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Blocked standards</div>

                    <ul class="list-group">
                        <li class="list-group-item" v-for="standard in standards">
                            <span v-if="standard.info.url" class="badge">
                                <a href="{{ standard.info.url }}">info</a>
                            </span>

                            <input type="checkbox"
                                :value="standard.info.identifier"
                                v-model="selectedStandards"
                                @change="onStandardChecked">
                            {{ standard.info.identifier }}
                        </li>
                    </ul>
                </div>
            </div>
        `,
        methods: {
            onStandardChecked: function () {
                this.$root.$data.setSelectedStandards(this.selectedStandards);
            },
            onLiteClicked: function () {
                this.$root.$data.setSelectedStandards(standardsDefaults.lite);
            },
            onConservativeClicked: function () {
                this.$root.$data.setSelectedStandards(standardsDefaults.conservative);
            },
            onAggressiveClicked: function () {
                this.$root.$data.setSelectedStandards(standardsDefaults.aggressive);
            },
            onClearClicked: function () {
                this.$root.$data.setSelectedStandards([]);
            },
            onAllClicked: function () {
                const allStandards = Object.keys(this.standards)
                    .map(aStdName => this.standards[aStdName].info.identifier);
                this.$root.$data.setSelectedStandards(allStandards);
            }
        }
    });
}());
