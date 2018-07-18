test: phony
	node ./1.js >stdout 2>stderr

# Пустой таргет. Превращает паттерн в .PHONY-подобный таргет.
# Хак нужен потому, что .PHONY не работает для паттернов (в т.ч. run-%).
.PHONY: phony
	phony: ; : $@
